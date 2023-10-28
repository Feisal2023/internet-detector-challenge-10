const image = document.getElementById("image");
const statusDisplay = document.getElementById("status");
const bgColor = document.getElementById("main");

function setColor() {
  bgColor.classList.add("online");
}

async function connectionStatus() {
  try {
    fetchResult = await fetch("https://jsonplaceholder.typicode.com/posts");
    image.src = "./image/online.png";
    setColor();
    return fetchResult.status >= 200 && fetchResult.status < 300;
  } catch (err) {
    console.error(err);
    statusDisplay.textContent = "OOPS!!! Your Internet Connection is Down";
    image.src = "./image/offline.png";
    bgColor.classList.remove("online");
  }
}

// monitor the connection
setInterval(async () => {
  const result = await connectionStatus();
  if (result) {
    statusDisplay.textContent = "You're ONLINE!!! Connection look good";
    setColor();
  }
}, 5000);

// check connection when page load
window.addEventListener("load", () => {
  if (connectionStatus()) {
    statusDisplay.textContent = "Online";
  } else {
    statusDisplay.textContent = "OFFline";
  }
});
