![image](/media/XTimelineAutoRefresh_a1.jpg)  

# X Timeline Auto Refresh - Chrome Extension

Elevate your X (Twitter) experience with the X Timeline Auto Refresh extension. This extension automatically loads new tweets as they appear in your X feed, making Twitter browsing seamless and effortless.

## Installation 
#### Manual installation in Chrome

- Unpack file anywhere  
- Go to `chrome://extensions`  
- Turn on Developer mode  
- Press "Load unpacked" and select folder with extension


## Extension Features

The **X Timeline Auto Refresh** extension offers powerful features to customize and optimize your browsing experience on X (Twitter). When you click on the extension icon or access the configuration panel, you can access several customizable options to adjust the extension's behavior according to your preferences.

1. **Refresh Interval:** You have the option to specify the time interval between each timeline refresh. Enter the desired number of seconds in this option and click "Save" before refreshing the page. This ensures that you receive the latest updates at regular intervals.

2. **Location Selection:** The extension operates where you want it to. You can choose from multiple options: "Home Feed," "User Profile," "Search Results," and "Lists." Check the corresponding boxes to determine where the extension will work.

3. **Refresh Conditions:** Customize the extension's behavior by setting specific conditions. These conditions determine when and how the page will be refreshed. For example, if you prefer the extension to stop refreshing when you're active on the current tab, enable the "Focused" feature. For uninterrupted usage, we recommend enabling both "Focused/Unfocused" and the "Anywhere" option.

With these advanced features, you have complete control over how the extension operates. Customize your browsing experience based on your needs, whether you want to stay constantly updated with the latest updates or prefer more sporadic refreshes. Enjoy a tailored Twitter experience with **X Timeline Auto Refresh**.

## Configuration

No additional configuration is required for X Timeline Auto Refresh. Simply install the extension, and it will work seamlessly with your X (Twitter) feed.

<br>

<br>

<br>

# Usage - Creating Your TweetDeck with Vivaldi

![image](/media/XTimelineAutoRefresh_a3.jpg)

<br>

Experience the power of X Timeline Auto Refresh, a extension that elevates your X (Twitter) experience to new heights.

With the integration of X Timeline Auto Refresh and Vivaldi Browser, you can effortlessly create your own personalized TweetDeck. Stay ahead of the curve by curating a tailored feed that combines updates from various social media platforms and websites, all in one place.

Harness the synergy of X Timeline Auto Refresh and Vivaldi Browser to craft a dynamic TweetDeck that fits your unique interests and professional needs. Whether you're a social media aficionado, a news junkie, or an information-savvy individual, this extension empowers you to stay informed and engaged like never before. Say goodbye to fragmented browsing and hello to a streamlined, comprehensive information hub.

<br>

![image](/media/XTimelineAutoRefresh_a2.jpg)

## Creating Your Own Layout with Vivaldi

To further customize your X (Twitter) browsing experience and extend it across various social media platforms and websites, follow this straightforward guide to create your personalized TweetDeck using Vivaldi Browser and X Timeline Auto Refresh:

1. **[Download and Install Vivaldi](https://vivaldi.com):** Begin by visiting the Vivaldi website and downloading the browser. Once the download is complete, follow the installation instructions to set up Vivaldi on your device.

3. **Create Tabs:** Launch Vivaldi and start opening tabs that align with your interests. These tabs could encompass Twitter feeds, news websites, social media profiles, and any other content you wish to monitor.

4. **Arrange Your Tabs:** After opening your desired tabs, it's time to organize them. Simply select all the tabs you want to include in your personalized TweetDeck. Right-click and choose the "Tile Tabs" option to align them side by side.

5. **Customize the Layout:** At the bottom-right corner of your Vivaldi browser, you'll notice an option to select your preferred layout style. Choose from vertical, horizontal, or grid formats, depending on your preference.

6. **Save Your Configuration:** Once your deck is set, click on the Vivaldi logo at the top-left corner and choose "File." From the dropdown menu, select "Save All Tabs as Session." Give your session a name that resonates with you and save it.

Now, whenever you want to access your personalized TweetDeck, launch Vivaldi and head to the Vivaldi logo at the top-left corner. Choose "File" and then "Open Saved Session." Select the session name you assigned earlier, and your entire TweetDeck layout will materialize just as you configured it.

By harnessing the capabilities of X Timeline Auto Refresh and Vivaldi Browser, you open the door to creating a cross-platform TweetDeck that aggregates updates and news from diverse sources. This tutorial empowers you to construct a versatile and efficient information hub that complements your curiosity and professional pursuits. Embrace a browsing experience tailored to you, all thanks to X Timeline Auto Refresh and Vivaldi Browser.

<br>

## Optimizing Interface

Enhancing your browsing experience is crucial to fully enjoy online platforms. In this section, we'll explore two simple yet effective methods to improve Twitter's interface according to your preferences. 

Whether you want to remove the sidebar or resize image and video previews, these tips will help you customize your experience and make navigation even smoother and more enjoyable. Follow these steps to optimize Twitter's interface according to your unique preferences and needs.

### Using Stylus to Optimize Interface:

1. **[Install Stylus:](https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne)** If you don't have Stylus installed already, you can download it from the Chrome Web Store. Stylus is an extension that lets you customize the appearance of websites by adding your own CSS styles.

3. Create a New Style: Once the extension is installed, click on the Stylus icon in your browser's toolbar, then select "Manage." Next, click on "Create new style" to open the style editor.

4. Copy the Code: Copy and paste the code below into the style editor. This code adjusts image and video previews on Twitter to conform to a 16:9 aspect ratio.

```
div.css-1dbjc4n.r-18bvks7.r-1867qdf.r-1phboty.r-rs99b7.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg {
  aspect-ratio: 16/9 !important;
  display: flex;
  justify-content: center;
  overflow: hidden; /* Pour masquer tout contenu dépassant du cadre */
  width: 100%; /* 100% de la largeur du conteneur */
  position: relative;
  object-fit: contain;
    
}

div.css-1dbjc4n.r-18bvks7.r-1867qdf.r-1phboty.r-rs99b7.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg img,
div.css-1dbjc4n.r-18bvks7.r-1867qdf.r-1phboty.r-rs99b7.r-1ny4l3l.r-1udh08x.r-o7ynqc.r-6416eg video {
  object-fit: contain;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
```
3. Save the Style: After copying the code, give your style a name (e.g., "Optimization 16:9 for Twitter") and click "Save."

4. Apply the Style: Once the style is saved, it will automatically be applied to Twitter. Open Twitter in your browser and observe how image and video previews are now optimized for a 16:9 aspect ratio.

Using Stylus allows you to customize the appearance of various elements on the websites you visit. Feel free to explore further and create custom CSS styles to enhance your online browsing experience.

## Removing the Left Sidebar Menu on Twitter

If you're looking to maximize your Twitter browsing experience by decluttering the interface, you can easily remove the left sidebar menu using browser extensions like "uBlock Origin" or similar ones. This tutorial will guide you through the process of installing the extension and using it to remove the sidebar, allowing you to optimize your interface.

### Install uBlock Origin Extension:


1. uBlock Origin Extension : [Download](https://chrome.google.com/webstore/detail/stylus/clngdbkpkpeebahjckkjfobafhncgmne) and Install uBlock Origin

2. Access Twitter: Open a new tab and navigate to Twitter. Make sure you're logged into your Twitter account.

4. Open uBlock Origin Popup: Look for the uBlock Origin icon in your browser's toolbar (usually a red shield icon). Click on it to open the popup.

5. Create a Rule Using the Picker: In the uBlock Origin popup, click on the large blue power button to activate the extension. Once activated, click on the uBlock Origin icon again to access the dashboard. Click on the "Pick an element from the page" button (usually a pipette icon) in the uBlock Origin dashboard.

6. Hover Over the Sidebar: Move your cursor over the left sidebar menu on Twitter. As you hover, elements on the page will be highlighted.

7. Preview and Test:When you hover over the sidebar, the specific element responsible for the sidebar will be highlighted. This ensures you're targeting the correct element. Click on the highlighted element to preview the changes. You should see the sidebar highlighted in red.

8. Create and Validate Rule: After confirming the highlighted element is indeed the sidebar, click to select it. uBlock Origin will generate a rule for blocking the element. A dialog box will appear asking you to confirm the rule. Click "Create" to proceed. The rule will be added to your filters list, and the sidebar should disappear from the Twitter page.

<br>

If you encounter any issues or want to bring back the sidebar, you can simply deactivate uBlock Origin or remove the created rule. Remember that browser extensions may receive updates, so some aspects of the user interface might change over time.


<br>

<br>

<br>

## Contribution

Contributions are welcome! For bug reports or enhancements, please submit an issue on the [GitHub repository](#).

## License

This project is licensed under the [MIT License](LICENSE).
