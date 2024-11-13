// import { useState, useEffect } from "react";
// import { gapi } from "gapi-script";
// import axios from "axios";
// import { useAuth } from "./AuthContext";
// import { useFilesRoles } from "./useFilesRolesContext";
// import {
//   GOOGLE_CLIENT_ID,
//   GOOGLE_API_KEY,
//   GOOGLE_APP_ID,
//   googleClientSecretKey,
// } from "../socialConfig";

// const CLIENT_ID = GOOGLE_CLIENT_ID;
// const API_KEY = GOOGLE_API_KEY;
// const APP_ID = GOOGLE_APP_ID;
// const SCOPES = "https://www.googleapis.com/auth/drive.metadata.readonly";

// // const SCOPES = "https://www.googleapis.com/auth/drive.file";

// function useGoogleDrive() {
//   const {
//     googleAccessToken,
//     setGoogleAccessToken,
//     googleRefreshToken,
//     setGoogleRefreshToken,
//     isGoogleAuthorized,
//     setIsGoogleAuthorized,
//   } = useAuth();

//   const { setGoogleFiles, setAttachGoogleFilesPre } = useFilesRoles();
//   const [error, setError] = useState(null);
//   const [buttonText, setButtonText] = useState("Connect to Google Drive");
//   const [content, setContent] = useState("");
//   const [tokenClient, setTokenClient] = useState(null);

//   useEffect(() => {
//     gapiLoaded();
//     gisLoaded();
//     if (googleAccessToken) {
//       setButtonText("Add from Google Drive");
//       setIsGoogleAuthorized(true);
//     }
//   }, [googleAccessToken]);

//   function gapiLoaded() {
//     gapi?.load("client:picker", initializePicker);
//   }

//   async function initializePicker() {
//     await gapi.client.load(
//       "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
//     );
//   }

//   function gisLoaded() {
//     const client = window.google.accounts.oauth2.initTokenClient({
//       client_id: CLIENT_ID,
//       scope: SCOPES,
//       access_type: "offline", // Request offline access for refresh token
//       prompt: "consent", // Ensure consent screen is shown to get refresh token
//       callback: "",
//     });
//     setTokenClient(client);
//   }

//   function handleAuthClick() {
//     if (!tokenClient) {
//       console.error("Token client not initialized");
//       return;
//     }

//     // Callback to handle OAuth response
//     tokenClient.callback = async (response) => {
//       if (response.error !== undefined) {
//         setError(response.error);
//         throw response;
//       }
//       const { access_token, expires_in, refresh_token } = response;
//       const expiryTime = new Date().getTime() + expires_in * 1000;

//       // Store tokens and expiry time
//       localStorage.setItem("googleAccessToken", access_token);
//       localStorage.setItem("googleTokenExpiryTime", expiryTime);
//       if (refresh_token) {
//         localStorage.setItem("googleRefreshToken", refresh_token);
//         setGoogleRefreshToken(refresh_token);
//       }

//       setGoogleAccessToken(access_token);
//       setIsGoogleAuthorized(true);
//       setButtonText("Add from Google Drive");
//       await createPicker(access_token); // Use the new access token
//     };

//     // Check if access token is present and not expired
//     if (!googleAccessToken || isTokenExpired()) {
//       if (googleRefreshToken) {
//         refreshAccessToken(googleRefreshToken); // Try to refresh the token first
//       } else {
//         tokenClient.requestAccessToken({ prompt: "consent" });
//       }
//     } else {
//       createPicker(googleAccessToken); // Use the existing valid token
//     }
//   }

//   function isTokenExpired() {
//     const expiryTime = localStorage.getItem("googleTokenExpiryTime");
//     return new Date().getTime() > expiryTime;
//   }

//   // function createPicker(accessToken) {
//   //   const view = new window.google.picker.View(
//   //     window.google.picker.ViewId.DOCS
//   //   );
//   //   view.setMimeTypes(
//   //     "application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain"
//   //   );
//   //   const picker = new window.google.picker.PickerBuilder()
//   //     .enableFeature(window.google.picker.Feature.NAV_HIDDEN)
//   //     .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
//   //     .setDeveloperKey(API_KEY)
//   //     .setAppId(APP_ID)
//   //     .setOAuthToken(accessToken) // Use the token obtained from OAuth
//   //     .addView(view)
//   //     .addView(new window.google.picker.DocsUploadView())
//   //     .setCallback(pickerCallback)
//   //     .build();
//   //   picker.setVisible(true);
//   // }

//   async function refreshAccessToken(refreshToken) {
//     try {
//       const response = await axios.post(
//         "https://oauth2.googleapis.com/token",
//         {
//           client_id: CLIENT_ID,
//           client_secret: googleClientSecretKey, // Replace with your actual client secret
//           refresh_token: refreshToken,
//           grant_type: "refresh_token",
//         },
//         {
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         }
//       );

//       const { access_token, expires_in } = response.data;
//       const expiryTime = new Date().getTime() + expires_in * 1000;

//       // Update local storage and state with the new access token and expiry time
//       localStorage.setItem("googleAccessToken", access_token);
//       localStorage.setItem("googleTokenExpiryTime", expiryTime);
//       setGoogleAccessToken(access_token);
//       setIsGoogleAuthorized(true);
//       setButtonText("Add from Google Drive");

//       // Re-attempt to use the Google Picker with the new access token
//       await createPicker(access_token);
//     } catch (error) {
//       console.error("Error refreshing access token:", error);
//       setError("Failed to refresh token. Please re-authenticate.");
//       // If refreshing fails, request login again
//       tokenClient.requestAccessToken({ prompt: "consent" });
//     }
//   }

//   function handleSignoutGoogleClick() {
//     revokeGoogleTokens(googleAccessToken, googleRefreshToken);

//     // Clear local storage and state
//     localStorage.removeItem("googleAccessToken");
//     localStorage.removeItem("googleRefreshToken");
//     localStorage.removeItem("googleTokenExpiryTime");
//     setGoogleAccessToken(null);
//     setGoogleRefreshToken(null);
//     setIsGoogleAuthorized(false);
//     setContent("");
//     setButtonText("Connect to Google Drive");
//   }

//   function revokeGoogleTokens(accessToken, refreshToken) {
//     if (accessToken) {
//       window.google.accounts.oauth2.revoke(accessToken, () => {
//         console.log("Google access token revoked");
//       });
//     }

//     if (refreshToken) {
//       // Revoke refresh token
//       axios
//         .post(
//           `https://oauth2.googleapis.com/revoke?token=${refreshToken}`,
//           {},
//           {
//             headers: {
//               "Content-type": "application/x-www-form-urlencoded",
//             },
//           }
//         )
//         .then(() => {
//           console.log("Refresh token revoked");
//         })
//         .catch((error) => {
//           console.error("Error revoking refresh token:", error);
//         });
//     }
//   }

//   function createPicker(accessToken) {
//     if (!accessToken) {
//       console.error("No access token available for Google Picker.");
//       return;
//     }

//     const view = new window.google.picker.View(
//       window.google.picker.ViewId.DOCS
//     );
//     view.setMimeTypes(
//       "application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/plain"
//     );
//     const picker = new window.google.picker.PickerBuilder()
//       .enableFeature(window.google.picker.Feature.NAV_HIDDEN)
//       .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
//       .setDeveloperKey(API_KEY)
//       .setAppId(APP_ID)
//       .setOAuthToken(accessToken) // Use the valid access token
//       .addView(view)
//       .addView(new window.google.picker.DocsUploadView())
//       .setCallback(pickerCallback)
//       .build();
//     picker.setVisible(true);
//   }

//   async function pickerCallback(data) {
//     if (data[window.google.picker.Response.ERROR]) {
//       console.error("Picker error:", data[window.google.picker.Response.ERROR]);
//       setError("An error occurred while using Google Picker.");
//       return;
//     }

//     if (data.action === window.google.picker.Action.PICKED) {
//       let filePreviewsUpdate = [];
//       data[window.google.picker.Response.DOCUMENTS].forEach((document) => {
//         const fileName = document[window.google.picker.Document.NAME];
//         filePreviewsUpdate.push({ fileName });
//         setGoogleFiles(filePreviewsUpdate);
//         setAttachGoogleFilesPre(filePreviewsUpdate);
//       });
//     }
//   }

//   return {
//     isAuthorized: isGoogleAuthorized,
//     buttonText,
//     handleAuthClick,
//     handleSignoutGoogleClick,
//     content,
//     error,
//   };
// }

// export default useGoogleDrive;
import { useState, useEffect } from "react";
import { gapi } from "gapi-script";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { useFilesRoles } from "./useFilesRolesContext";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_API_KEY,
  GOOGLE_APP_ID,
  googleClientSecretKey,
} from "../socialConfig";
import { addToast } from "./useToastContext";

const CLIENT_ID = GOOGLE_CLIENT_ID;
const API_KEY = GOOGLE_API_KEY;
const APP_ID = GOOGLE_APP_ID;
const SCOPES =
  "https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.file";

function useGoogleDrive() {
  const {
    googleAccessToken,
    setGoogleAccessToken,
    googleRefreshToken,
    setGoogleRefreshToken,
    isGoogleAuthorized,
    setIsGoogleAuthorized,
  } = useAuth();

  const { setGoogleFiles, handleFileMsDriveSelectionAndUpload } =
    useFilesRoles();

  const isSettingsPage = window.location.pathname === "/settings";

  const [error, setError] = useState(null);
  const [buttonText, setButtonText] = useState("Connect to Google Drive");
  const [content, setContent] = useState("");
  const [tokenClient, setTokenClient] = useState(null);

  useEffect(() => {
    gapiLoaded();
    gisLoaded();

    if (googleAccessToken && !isTokenExpired()) {
      setButtonText("Add from Google Drive");
      setIsGoogleAuthorized(true);
    }

    // Refresh token check every minute
    const interval = setInterval(() => {
      if (isTokenExpired()) {
        removeTokensFromLocalStorage();
        setIsGoogleAuthorized(false);
        setButtonText("Connect to Google Drive");
      }
    }, 60000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [googleAccessToken]);

  function gapiLoaded() {
    gapi?.load("client:picker", initializePicker);
  }

  async function initializePicker() {
    await gapi?.client.load(
      "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"
    );
  }

  function gisLoaded() {
    const client = window?.google?.accounts?.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: "",
    });
    setTokenClient(client);
  }

  // function handleAuthClick() {
  //   if (!tokenClient) {
  //     console.error("Token client not initialized");
  //     return;
  //   }

  //   tokenClient.callback = async (response) => {
  //     if (response.error) {
  //       setError(response.error);
  //       throw response;
  //     }

  //     const { access_token, expires_in, refresh_token } = response;
  //     const expiryTime = new Date().getTime() + expires_in * 1000;

  //     sessionStorage.setItem("googleAccessToken", access_token);
  //     sessionStorage.setItem("googleTokenExpiryTime", expiryTime);

  //     if (refresh_token) {
  //       sessionStorage.setItem("googleRefreshToken", refresh_token);
  //       setGoogleRefreshToken(refresh_token);
  //     }

  //     setGoogleAccessToken(access_token);
  //     setIsGoogleAuthorized(true);
  //     setButtonText("Add from Google Drive");

  //     await createPicker(access_token);
  //   };

  //   if (!googleAccessToken || isTokenExpired()) {
  //     if (googleRefreshToken) {
  //       refreshAccessToken(googleRefreshToken);
  //     } else {
  //       tokenClient.requestAccessToken({ prompt: "consent" });
  //     }
  //   } else {
  //     createPicker(googleAccessToken);
  //   }
  // }

  function handleAuthClick() {
    if (!tokenClient) {
      console.error("Token client not initialized");
      return;
    }

    tokenClient.callback = async (response) => {
      if (response.error) {
        setError(response.error);
        throw response;
      }

      const { access_token, expires_in, refresh_token } = response;
      const expiryTime = new Date().getTime() + expires_in * 1000;

      sessionStorage.setItem("googleAccessToken", access_token);
      sessionStorage.setItem("googleTokenExpiryTime", expiryTime);

      if (refresh_token) {
        sessionStorage.setItem("googleRefreshToken", refresh_token);
        setGoogleRefreshToken(refresh_token);
      }

      setGoogleAccessToken(access_token);
      setIsGoogleAuthorized(true);
      setButtonText("Add from Google Drive");

      if (!isSettingsPage) {
        await createPicker(access_token);
      }
      if (isSettingsPage) {
        addToast({
          type: "success",
          message: "Google drive is connected now",
        });
      }
    };

    if (!googleAccessToken || isTokenExpired()) {
      if (googleRefreshToken) {
        refreshAccessToken(googleRefreshToken);
      } else {
        tokenClient.requestAccessToken({ prompt: "consent" });
      }
    } else {
      if (!isSettingsPage) {
        createPicker(googleAccessToken);
      }
    }
  }

  function isTokenExpired() {
    const expiryTime = sessionStorage.getItem("googleTokenExpiryTime");
    const currentTime = new Date().getTime();
    return currentTime > expiryTime;
  }

  function removeTokensFromLocalStorage() {
    sessionStorage.removeItem("googleAccessToken");
    sessionStorage.removeItem("googleRefreshToken");
    sessionStorage.removeItem("googleTokenExpiryTime");
  }

  async function refreshAccessToken(refreshToken) {
    try {
      const response = await axios.post(
        "https://oauth2.googleapis.com/token",
        {
          client_id: CLIENT_ID,
          client_secret: googleClientSecretKey,
          refresh_token: refreshToken,
          grant_type: "refresh_token",
        },
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const { access_token, expires_in } = response.data;
      const expiryTime = new Date().getTime() + expires_in * 1000;

      sessionStorage.setItem("googleAccessToken", access_token);
      sessionStorage.setItem("googleTokenExpiryTime", expiryTime);
      setGoogleAccessToken(access_token);
      setIsGoogleAuthorized(true);
      setButtonText("Add from Google Drive");

      await createPicker(access_token);
    } catch (error) {
      console.error("Error refreshing access token:", error);
      setError("Failed to refresh token. Please re-authenticate.");
      tokenClient.requestAccessToken({ prompt: "consent" });
    }
  }

  function handleSignoutGoogleClick() {
    revokeGoogleTokens(googleAccessToken, googleRefreshToken);
    removeTokensFromLocalStorage();

    setGoogleAccessToken(null);
    setGoogleRefreshToken(null);
    setIsGoogleAuthorized(false);
    setContent("");
    setButtonText("Connect to Google Drive");
    if (isSettingsPage) {
      addToast({
        type: "success",
        message: "Google drive is disconnected now",
      });
    }
  }

  function revokeGoogleTokens(accessToken, refreshToken) {
    if (accessToken) {
      window?.google?.accounts?.oauth2.revoke(accessToken, () => {
        console.log("Google access token revoked");
      });
    }

    if (refreshToken) {
      axios
        .post(
          `https://oauth2.googleapis.com/revoke?token=${refreshToken}`,
          {},
          {
            headers: {
              "Content-type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then(() => {
          console.log("Refresh token revoked");
        })
        .catch((error) => {
          console.error("Error revoking refresh token:", error);
        });
    }
  }

  function createPicker(accessToken) {
    if (!accessToken) {
      console.error("No access token available for Google Picker.");
      return;
    }

    // Creating a DocsView to show folders and all document types
    const docsView = new window.google.picker.DocsView()
      .setIncludeFolders(true) // Enable folder browsing
      .setMode(window.google.picker.DocsViewMode.LIST)
      .setMimeTypes(
        "application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document," +
          "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet," +
          "text/plain,application/vnd.google-apps.document,application/vnd.google-apps.spreadsheet," +
          "application/vnd.google-apps.presentation" // Exclude image MIME types
      );

    const view = new window.google.picker.View(
      window.google.picker.ViewId.DOCS
    );
    view.setMimeTypes(
      "application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document," +
        "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet," +
        "text/plain"
    );
    const picker = new window.google.picker.PickerBuilder()
      .enableFeature(window.google.picker.Feature.NAV_HIDDEN)
      .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
      .setDeveloperKey(API_KEY)
      .setAppId(APP_ID)
      .setOAuthToken(accessToken)
      .addView(docsView) // Add DocsView to show folders and files
      .addView(view)
      .setSize(window.innerWidth, window.innerHeight + 500)
      .setCallback(pickerCallback)
      .build();
    picker.setVisible(true);
  }

  async function pickerCallback(data) {
    if (data[window.google.picker.Response.ERROR]) {
      setError("An error occurred while using Google Picker.");
      return;
    }

    if (data.action === window.google.picker.Action.PICKED) {
      let filePreviewsUpdate = [];
      let files = [];
      const formData = new FormData();
      for (const document of data[window.google.picker.Response.DOCUMENTS]) {
        const fileName = document[window.google.picker.Document.NAME];
        const fileId = document[window.google.picker.Document.ID];
        const mimeType = document[window.google.picker.Document.MIME_TYPE];
        // const isFolder = document[window.google.picker.Document.TYPE] === "folder";

        // if (isFolder) {
        //   selectedFolderId = fileId; // Store the selected folder ID globally
        //   const docsView = new window.google.picker.DocsView()
        //       .setIncludeFolders(true)
        //       .setSelectFolderEnabled(true)
        //       .setParent(selectedFolderId) // Keep the selected folder as the current view
        //       .setMimeTypes(
        //           "application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document," +
        //           "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet," +
        //           "text/plain,application/vnd.google-apps.document,application/vnd.google-apps.spreadsheet," +
        //           "application/vnd.google-apps.presentation"
        //       );

        //   const view = new window.google.picker.View(window.google.picker.ViewId.DOCS);
        //   view.setMimeTypes(
        //       "application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document," +
        //       "application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet," +
        //       "text/plain"
        //   );

        //   const picker = new window.google.picker.PickerBuilder()
        //       .enableFeature(window.google.picker.Feature.NAV_HIDDEN)
        //       .enableFeature(window.google.picker.Feature.MULTISELECT_ENABLED)
        //       .setDeveloperKey(API_KEY)
        //       .setAppId(APP_ID)
        //       .setOAuthToken(googleAccessToken)
        //       .addView(docsView) // Reload the view to maintain the folder's content
        //       .addView(view)
        //       .addView(new window.google.picker.DocsUploadView())
        //       .setCallback(pickerCallback)
        //       .build();

        //   picker.setVisible(true);
        //   return; // Exit the callback to prevent further processing
        // }
        filePreviewsUpdate.push({ fileName });
        setGoogleFiles(filePreviewsUpdate);
        // Get the access token for Google API requests
        const accessToken = gapi.auth.getToken().access_token;

        // Use the Google Drive API to download the file
        let fileUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
        // Check if the file is a Google Docs, Sheets, or Slides file and adjust the URL
        if (mimeType === "application/vnd.google-apps.document") {
          fileUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=application/vnd.openxmlformats-officedocument.wordprocessingml.document`; // Export as DOCX
        } else if (mimeType === "application/vnd.google-apps.spreadsheet") {
          fileUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`; // Export as XLSX
        } else if (mimeType === "application/vnd.google-apps.presentation") {
          fileUrl = `https://www.googleapis.com/drive/v3/files/${fileId}/export?mimeType=application/vnd.openxmlformats-officedocument.presentationml.presentation`; // Export as PPTX
        }
        const response = await fetch(fileUrl, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!response.ok) {
          console.error(
            `Failed to fetch file: ${response.status} ${response.statusText}`
          );
        }
        let blob = "";
        if (
          [
            "application/vnd.google-apps.document",
            "application/vnd.google-apps.spreadsheet",
            "application/vnd.google-apps.presentation",
          ].includes(mimeType)
        ) {
          blob = response;
        } else {
          blob = await response.blob();
        }
        const file = new File([blob], fileName, { type: blob.type });
        files.push(file);
        formData.append("files[]", file, fileName);
      }
      handleFileMsDriveSelectionAndUpload(files);
    }
  }

  return {
    isAuthorized: isGoogleAuthorized,
    buttonText,
    handleAuthClick,
    handleSignoutGoogleClick,
    content,
    error,
  };
}

export default useGoogleDrive;
