// Cet exemple ne fait rien de spécifique, c'est juste un modèle de base pour le fichier background.js

// Cette fonction est appelée lorsque l'extension est installée ou mise à jour
chrome.runtime.onInstalled.addListener(() => {
    console.log("Extension installed or updated.");
});

// Écoutez les événements et les messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "popupClicked") {
        // Code à exécuter lorsque l'utilisateur clique sur l'icône de l'extension dans la barre d'outils
        // Par exemple, ouvrir la page d'options ici
        chrome.tabs.create({ url: "settings/options.html" });
    }
});
