import { useState } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import { REACT_APP_MS_DRIVE_CLIENT_ID } from "../socialConfig";
import { useFilesRoles } from "./useFilesRolesContext";
import { addToast } from "./useToastContext";

// MSAL configurations
const msalParamsBusiness = {
  auth: {
    authority: "https://login.microsoftonline.com/organizations",
    clientId: REACT_APP_MS_DRIVE_CLIENT_ID,
    redirectUri: window.location.origin,
    prompt: "select_account",
  },
};

// Configuration for MSAL: Personal login
const msalParamsPersonal = {
  auth: {
    authority: "https://login.microsoftonline.com/consumers",
    clientId: REACT_APP_MS_DRIVE_CLIENT_ID,
    redirectUri: window.location.origin,
    prompt: "select_account",
  },
};

// MSAL applications
const appBusiness = new PublicClientApplication(msalParamsBusiness);
const appPersonal = new PublicClientApplication(msalParamsPersonal);

async function initializeMsal(appInstance) {
  try {
    await appInstance.initialize();
  } catch (e) {
    console.error("MSAL initialization failed: ", e);
  }
}

// Helper function to combine paths
function combine(...paths) {
  return paths
    .map((path) => path.replace(/^[\\|/]/, "").replace(/[\\|/]$/, ""))
    .join("/")
    .replace(/\\/g, "/");
}

async function getTokenDownload(appInstance, isBusiness) {
  const authParams = isBusiness ?  { scopes: ["Files.Read", "Sites.Read.All"] } : { scopes: ["Files.Read", "User.Read"] };
  try {
    const response = await appInstance.acquireTokenSilent(authParams);
    return response.accessToken;
  } catch (error) {
    if (error) {
      const response = await appInstance.loginPopup(authParams);
      return response.accessToken;
    }
  }
}

async function getToken(command, win, appInstance, isBusiness) {
  await initializeMsal(appInstance);

  let accessToken = "";
  let authParams = null;

  switch (command.type) {
    case "SharePoint":
    case "SharePoint_SelfIssued":
      if (isBusiness) {
        authParams = { scopes: [combine(command.resource, ".default")] };
      } else {
        authParams = { scopes: ["Files.Read", 'Files.ReadWrite', "User.Read"] };
      }
      break;
    default:
      break;
  }

  try {
    const resp = await appInstance.acquireTokenSilent(authParams);
    accessToken = resp.accessToken;
  } catch (e) {
    try {
      const resp = await appInstance.loginPopup(authParams);
      appInstance.setActiveAccount(resp.account);
      if (resp.idToken) {
        const resp2 = await appInstance.acquireTokenSilent(authParams);
        accessToken = resp2.accessToken;
      }
    } catch (err) {
      if (
        err.name === "BrowserAuthError" &&
        err.errorCode === "popup_window_error"
      ) {
        win.close();
        alert(
          "Error opening popup window. Please enable popups in your browser settings and try again."
        );
        return null;
      }
    }
  }
  return accessToken;
}

export const useMicrosoftDrive = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [msAccessToken, setMsAccessToken] = useState(
    sessionStorage.getItem("microsoftAccessToken")
  );
  const [msAccessPersonalToken, setMsPersonalAccessToken] = useState(
    sessionStorage.getItem("microsoftPersonalAccessToken")
  );

  const isSettingsPage = window.location.pathname === "/settings";

  // eslint-disable-next-line no-unused-vars
  const [pickedFiles, setPickedFiles] = useState([]);

  const { setGoogleFiles, handleFileMsDriveSelectionAndUpload } =
    useFilesRoles();

  let win = null;
  let port = null;

  const base_url_business = "https://uxuistudio-my.sharepoint.com";
  const base_url_personal = "https://uxuistudio-my.sharepoint.com";

  const params = {
    sdk: "8.0",
    entry: {
      oneDrive: {},
    },
    authentication: {},
    messaging: {
      origin: window.location.origin,
      channelId: "27",
    },
    typesAndSources: {
      mode: "files",
      pivots: {
        oneDrive: true,
        recent: true,
      },
    },
    selection: {
      mode: "multiple",
      maxCount: 5
    },
  };

  const handleLoginMSDrive = async (e, isBusiness) => {
    e.preventDefault();
    const appInstance = isBusiness ? appBusiness : appPersonal;
    const baseUrl = isBusiness ? base_url_business : base_url_personal;
    await initializeMsal(appInstance);

    if (isSettingsPage) {
      const authToken = await getToken(
        {
          resource: baseUrl,
          command: "authenticate",
          type: "SharePoint",
        },
        null,
        appInstance,
        isBusiness
      );
      if (authToken) {
        if (isBusiness) {
          sessionStorage.setItem("microsoftAccessToken", authToken);
          setMsAccessToken(authToken);
        } else {
          sessionStorage.setItem("microsoftPersonalAccessToken", authToken);
          setMsPersonalAccessToken(authToken);
        }
        addToast({
          type: "success",
          message: "MS OneDrive is connected now",
        });
      }
      return;
    }

    win = window.open(
      "",
      "Picker",
      "width=800,height=600,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no"
    );

    const authToken = await getToken(
      {
        resource: baseUrl,
        command: "authenticate",
        type: "SharePoint",
      },
      win,
      appInstance,
      isBusiness
    );

    if (authToken) {
      if (isBusiness) {
        sessionStorage.setItem("microsoftAccessToken", authToken);
        setMsAccessToken(authToken);
      } else {
        sessionStorage.setItem("microsoftPersonalAccessToken", authToken);
        setMsPersonalAccessToken(authToken);
      }
    }

    const queryString = new URLSearchParams({
      filePicker: JSON.stringify(params),
    });

    const url = combine(baseUrl, `_layouts/15/FilePicker.aspx?${queryString}`);
    const form = win.document.createElement("form");
    form.setAttribute("action", url);
    form.setAttribute("method", "POST");
    win.document.body.append(form);

    const input = win.document.createElement("input");
    input.setAttribute("type", "hidden");
    input.setAttribute("name", "access_token");
    input.setAttribute("value", authToken);
    form.appendChild(input);

    form.submit();

    window.addEventListener("message", (event) => {
      if (event.source && event.source === win) {
        const message = event.data;

        if (
          message.type === "initialize" &&
          message.channelId === params.messaging.channelId
        ) {
          port = event.ports[0];
          port.addEventListener("message", (msg) =>
            messageListener(msg, appInstance, isBusiness)
          );
          port.start();

          port.postMessage({
            type: "activate",
          });
        }
      }
    });
  };

  const messageListener = async (message, appInstance, isBusiness) => {
    switch (message.data.type) {
      case "notification":
        break;
      case "command":
        port.postMessage({
          type: "acknowledge",
          id: message.data.id,
        });

        const command = message.data.data;

        switch (command.command) {
          case "authenticate":
            const token = await getToken(command, win, appInstance, isBusiness);

            if (typeof token !== "undefined" && token !== null) {
              port.postMessage({
                type: "result",
                id: message.data.id,
                data: {
                  result: "token",
                  token,
                },
              });
            } else {
              console.error(
                `Could not get auth token for command: ${JSON.stringify(
                  command
                )}`
              );
            }
            break;

          case "close":
            win.close();
            break;

          case "pick":
            setPickedFiles(command);
            let filePreviewsUpdate = [];
            let files = [];
            const formData = new FormData();
            const authToken = await getTokenDownload(appInstance, isBusiness);
            for (const ms_document of command["items"]) {
              const fileName = ms_document.name;
              filePreviewsUpdate.push({ fileName });
              setGoogleFiles(filePreviewsUpdate);
              const graphApiUrl = `https://graph.microsoft.com/v1.0/me/drive/items/${ms_document.id}/content`;
              const response = await fetch(graphApiUrl, {
                headers: {
                  Authorization: `Bearer ${authToken}`,
                },
              });
              if (!response.ok) {
                console.error(
                  `Failed to fetch file: ${response.status} ${response.statusText}`
                );
              }
              const blob = await response.blob();
              const file = new File([blob], fileName, { type: blob.type });
              files.push(file);
              formData.append("files[]", file, fileName);
            }
            handleFileMsDriveSelectionAndUpload(files);
            port.postMessage({
              type: "result",
              id: message.data.id,
              data: {
                result: "success",
              },
            });
            win.close();
            break;
          default:
            console.warn(`Unsupported command: ${JSON.stringify(command)}`);
            port.postMessage({
              result: "error",
              error: {
                code: "unsupportedCommand",
                message: command.command,
              },
              isExpected: true,
            });
            break;
        }
        break;
      default:
        console.warn(`Unsupported message type: ${message.data.type}`);
        break;
    }
  };

  const handleLogoutMSDrive = async (isBusiness) => {
    const appInstance = isBusiness ? appBusiness : appPersonal;

    // Ensure MSAL is initialized
    await initializeMsal(appInstance);

    try {
      await appInstance.logoutPopup();
      if (isBusiness) {
        sessionStorage.removeItem("microsoftAccessToken");
        setMsAccessToken(null);
      } else {
        sessionStorage.removeItem("microsoftPersonalAccessToken");
        setMsPersonalAccessToken(null);
      }

      setIsConnected(false);
      setAccountName("");
      if (isSettingsPage) {
        addToast({
          type: "success",
          message: "MS one drive is disconnected now",
        });
      }
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return {
    isConnected,
    accountName,
    handleLoginMSDrive,
    handleLogoutMSDrive,
    getTokenDownload,
    getToken,
    appBusiness,
    appPersonal,
    combine,
    initializeMsal,
    msAccessToken,
    msAccessPersonalToken,
  };
};
