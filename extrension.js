var config = {
    apiKey: "AIzaSyAqlUskzmjinKAQ7kpA1eJFLNJ1fEXgYkM",
    authDomain: "browsersmart-5f450.firebaseapp.com",
    databaseURL: "https://browsersmart-5f450-default-rtdb.firebaseio.com",
    projectId: "browsersmart-5f450",
    storageBucket: "browsersmart-5f450.appspot.com",
    messagingSenderId: "600801488042",
    appId: "1:600801488042:web:72df635247b5c1ee77f4d3"
	};
// Initialize Firebase
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(user => {
  

            var Fuid = user.uid;
            Duid =  "User/"+(Fuid);
            localStorage.setItem("Uid", Fuid);

            var ST = firebase.database().ref(Duid).child('Turl');
            ST.on('value', function(snapshot) {
            var Y = (snapshot.val());
			
			document.getElementById("turl").innerHTML = (Y);
			localStorage.setItem("turl", Y);
			});
			
			var ST1 = firebase.database().ref(Duid).child('Tcount');
            ST1.on('value', function(snapshot) {
            var Y1 = (snapshot.val());
			document.getElementById("countdown").innerHTML = (Y1);
			localStorage.setItem("tc", Y1);
			chrome.storage.local.set('counter', Y1);
			});
			
			var ST2 = firebase.database().ref(Duid).child('Tpoint');
            ST2.on('value', function(snapshot) {
            var Y2 = (snapshot.val());
			document.getElementById("tpoint").innerHTML = (Y2);
			});
			
			var ST3 = firebase.database().ref(Duid).child('point');
            ST3.on('value', function(snapshot) {
            var Y3 = (snapshot.val());
			document.getElementById("point").innerHTML = (Y3);
			});
	
});



// Determine if the browser chrome is dark
const isDarkTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

const CONTEXT_MENU_ID = 'dc82bba0-dfd0-484d-9782-c8a27c521121';
const MUTE_TAB_STR = 'Show Stats';
const UNMUTE_TAB_STR = 'Normal';
const MUTED_BADGE_STR = localStorage.getItem("tc");
const BADGE_BACKGROUND = '#212121';
const EXTENSION_ICONS = Object.freeze({
  muted: {
    '16': `images/16_m${isDarkTheme ? '_white' : ''}.png`,
    '48': `images/48_m${isDarkTheme ? '_white' : ''}.png`,
    '128': `images/128_m${isDarkTheme ? '_white' : ''}.png`,
  },
  unmuted: {
    '16': `images/16_u${isDarkTheme ? '_white' : ''}.png`,
    '48': `images/48_u${isDarkTheme ? '_white' : ''}.png`,
    '128': `images/128_u${isDarkTheme ? '_white' : ''}.png`,
  },
});
const MUTED_ICONS = EXTENSION_ICONS.muted;
const UNMUTED_ICONS = EXTENSION_ICONS.unmuted;

// Listen for tab switches and update the browserAction icon according to audible state
chrome.tabs.onActivated.addListener(function ({ tabId }) {
  chrome.tabs.get(tabId, function (tab) {
    if (tab.mutedInfo.muted) { return; }
    setIconFromAudible(tab.audible, tab.id);
  });
});

// Listen for tab updates and update the icon to reflect the new state of the tab
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // Keep the muted icon in sync if the tab was reloaded
  if ('status' in changeInfo) {
    return updateUIState(tab, tab.mutedInfo.muted);
  }

  // If we're currently muted or about to be muted, then exit early
  if ((tab.mutedInfo.muted && !('mutedInfo' in changeInfo)) || ('mutedInfo' in changeInfo && changeInfo.mutedInfo.muted)) {
    return;
  }

  // Otherwise, check audible state and update icon accordingly.
  if ('audible' in changeInfo) {
    setIconFromAudible(changeInfo.audible, tabId);
  }
});

// Only create listeners if not already set up to prevent error
if (!chrome.contextMenus.onClicked.hasListeners()) {
  // Create context menu on all available menus
  chrome.contextMenus.create({
    id: CONTEXT_MENU_ID,
    type: 'normal',
    title: MUTE_TAB_STR,
    contexts: ['all'] // Chrome doesn't allow us to add a custom context menu item to the actual tab.
  });

  // Modify the mute state when interacting with the context menu option
  chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === CONTEXT_MENU_ID) {
      updateMuteState(tab);
    }
  });
}

// Browser frame icon
chrome.browserAction.setBadgeBackgroundColor({ color: BADGE_BACKGROUND });
chrome.browserAction.onClicked.addListener(function (tab) {
  updateMuteState(tab);
});

// Flip the muted state of the tab
function updateMuteState(tab) {
  let current_state = tab.mutedInfo.muted;
  let should_mute = !current_state;
  updateUIState(tab, should_mute);
}

// Update the UI to reflect the current muted state
function updateUIState(tab, should_mute) {
  let tabId = tab.id;
  let title = MUTE_TAB_STR;
  if (should_mute) {
    title = UNMUTE_TAB_STR;

    chrome.browserAction.setBadgeText({ text: MUTED_BADGE_STR, tabId });
    chrome.browserAction.setIcon({ path: MUTED_ICONS, tabId });
  } else {
    chrome.browserAction.setBadgeText({ text: '', tabId });
    setIconFromAudible(tab.audible, tabId);
  }
  chrome.contextMenus.update(CONTEXT_MENU_ID, { title });
  
}

// Update icon based on audible state
function setIconFromAudible(is_audible, tabId) {
  let path = is_audible ? UNMUTED_ICONS : MUTED_ICONS;
  chrome.browserAction.setIcon({ path, tabId });
  
  	
	
  
  if (path === UNMUTED_ICONS) {
    
	docall0();
  }
  
  if (path === MUTED_ICONS) {
    
	docall2();
  }
  
}



function docall0(){


	docalld()

	
}


function docalld(){	
	var turl = localStorage.getItem("turl");
	 chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let curl = tabs[0].url;

	
	if (turl == curl){
    docheck();
	}
});		
}	
		
function docheck(){
    var tc = document.getElementById("countdown").innerHTML;
	alert(tc);
    if (tc < 0){
    alert("Please Pose video and sart again don't reload");
	}
  else  {
  docall();
  
  }
}

var timer;

function countDown(i, callback) {
    //callback = callback || function(){};
    timer = setInterval(function() {
		if(i <= 0){
			(clearInterval(timer), callback());
		}
		else {
        document.getElementById("countdown").innerHTML = i;
		localStorage.setItem("tc", i);}
        i -= 1 
    }, 1000);
}
	


function docall(){

var tam = document.getElementById("countdown").innerHTML;


    countDown(tam, function(){
        alert("Countdown done!")
		            var usid = localStorage.getItem("Uid");
					tagid = "User/"+(usid);
					var Tpoint = +document.getElementById("tpoint").innerHTML;
					var Point = +document.getElementById("point").innerHTML;
					var Epoint = Tpoint+Point;
                    firebase.database().ref(tagid).update({
						  Turl : 0,
						  Tcount : 0,
						  Tpoint : 0,
						  point : Epoint,
						
                    });
    
      localStorage.setItem("turl", "Y");
      document.getElementById("countdown").value = 0;
    });
}		
	
	
	function docall2(){

 clearInterval(timer);
  var tc = document.getElementById("countdown").value;
  
}
	




 
