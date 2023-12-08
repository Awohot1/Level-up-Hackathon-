"use strict";
const HIDE_CLASS = "hide";
const ACTIVE_CLASS = "active";
const COMPLETED_CLASS = "completed";
//NavBar
const notification = document.querySelector(".notification");
const store = document.querySelector(".store");
//Account Popup
const alert = document.querySelector("#alert-box");
const accountDetails = document.querySelector("#account-details");
const allAccountMenuItems =
  accountDetails.querySelectorAll('[role="menuitem"]');
const allAlertMenuItems = alert.querySelectorAll('[role="menuitem"]');
//Plan Navigation
const plan = document.querySelector("#plan");
const closePlan = document.querySelector(".close-plan");
const closePlanMobile = document.querySelector(".close-plan-mobile");
// Setup Guide
const arrow = document.querySelector(".arrow");
const setupGuide = document.querySelector(".setup-guide");
const progressBar = document.querySelector(".progress-bar");
const checked = document.querySelector(".checked");
const total = document.querySelector(".total");
// Components
const components = document.querySelectorAll(".component");
const componentsTitle = document.querySelectorAll(".component-title");
const componentIcons = document.querySelectorAll(".component-icon");
const iconDash = document.querySelectorAll(".icon-dash");
const iconCheck = document.querySelectorAll(".icon-checked");
const iconLoad = document.querySelectorAll(".icon-load");
const componentStatus = document.querySelector(".component-status");
// ALERT TOGGLE
notification.addEventListener("click", toggleAlert);
// ACCOUNT DETAILS TOGGLE
store.addEventListener("click", toggleStore);

// CLOSE PLAN
closePlan.addEventListener("click", () => {
  plan.classList.add(HIDE_CLASS);
});
closePlanMobile.addEventListener("click", () => {
  plan.classList.add(HIDE_CLASS);
});
//Add checked circle
function addCheck(componentIcon) {
  componentIcon.querySelector(".icon-dash").classList.add(HIDE_CLASS);
  componentIcon.querySelector("#icon-load").classList.remove(HIDE_CLASS);

  setTimeout(() => {
    componentIcon.querySelector("#icon-load").classList.add(HIDE_CLASS);
    componentIcon.querySelector("#icon-checked").classList.remove(HIDE_CLASS);
    componentIcon.ariaLabel = componentIcon.ariaLabel.replace(
      "as not done",
      "as done"
    );

    componentIcon.closest(".component").classList.add(COMPLETED_CLASS);
    updateProgressBar();
  }, 3000);
}

//Remove checked circle
function removeCheck(componentIcon) {
  componentIcon.querySelector(".icon-checked").classList.add(HIDE_CLASS);
  componentIcon.querySelector("#icon-load").classList.remove(HIDE_CLASS);

  setTimeout(() => {
    componentIcon.querySelector("#icon-load").classList.add(HIDE_CLASS);
    componentIcon.querySelector("#icon-dash").classList.remove(HIDE_CLASS);
    componentIcon.ariaLabel = componentIcon.ariaLabel.replace(
      "as done",
      "as not done"
    );

    componentIcon.closest(".component").classList.remove(COMPLETED_CLASS);
    updateProgressBar();
  }, 3000);
}

//Add or Remove Checked Circle
componentIcons.forEach((componentIcon) => {
  componentIcon.addEventListener("click", () => {
    const complete =
      componentIcon.parentElement.parentElement.classList.contains(
        COMPLETED_CLASS
      );
    if (complete) {
      removeCheck(componentIcon);
    } else {
      addCheck(componentIcon);
    }
  });
});

//Add Active Component
function addActive() {
  componentsTitle.forEach((component, index) => {
    component.addEventListener("click", () => {
      component.closest(".component").classList.add(ACTIVE_CLASS);
      component.parentElement.parentElement.parentElement
        .querySelector("#component-img")
        .classList.remove(HIDE_CLASS);
      let currentActive = index;
      update(currentActive);
    });
  });
}
// Update Completed
function update(currentActive) {
  components.forEach((component, index) => {
    if (index < currentActive || index > currentActive) {
      component.classList.remove(ACTIVE_CLASS);
      component.querySelector("#component-img").classList.add(HIDE_CLASS);
    }
    updateProgressBar();
  });
}
function updateProgressBar() {
  //Progress Bar
  const completed = document.querySelectorAll(".completed");
  let bar = (completed.length / components.length) * 72;
  progressBar.style.width = bar + "px";
  //Progress Number
  checked.innerText = `${completed.length} `;
  total.innerText = ` ${components.length}`;
}

// ARROW ROTATE & SETUP EXPANSION
function updateHeight() {
  if (setupGuide.style.height === "118px" || setupGuide.style.height === "") {
    setupGuide.style.height = "auto";
  } else setupGuide.style.height = "118px";
}
arrow.addEventListener("click", () => {
  arrow.classList.toggle("rotate");
  updateHeight();
});

addActive();

// Store Key Navigation
function handleStoreMenuItemArrowKeyPress(event, menuItemIndex) {
  const isLastMenuItem = menuItemIndex === allAccountMenuItems.length - 1;
  const isFirstMenuItem = menuItemIndex === 0;
  const nextMenuItem = allAccountMenuItems.item(menuItemIndex + 1);
  const prevMenuItem = allAccountMenuItems.item(menuItemIndex - 1);

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    if (isLastMenuItem) {
      allAccountMenuItems.item(0).focus();
      return;
    }
    nextMenuItem.focus();
  }
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    if (isFirstMenuItem) {
      allAccountMenuItems.item(allAccountMenuItems.length - 1).focus();
      return;
    }
    prevMenuItem.focus();
  }
}

function handleEscapeKey(event) {
  if (event.key === "Escape") {
    toggleStore();
  }
}

function openMenu() {
  store.ariaExpanded = "true";
  allAccountMenuItems.item(0).focus();
  accountDetails.addEventListener("keyup", handleEscapeKey);

  allAccountMenuItems.forEach(function (menuItem, menuItemIndex) {
    menuItem.addEventListener("keyup", function (event) {
      handleStoreMenuItemArrowKeyPress(event, menuItemIndex);
    });
  });
}
function closeMenu() {
  store.ariaExpanded = "false";
  store.focus();

  accountDetails.addEventListener("keyup", handleEscapeKey);
}

function toggleStore() {
  const isExpanded = store.attributes["aria-expanded"].value === "true";
  accountDetails.classList.toggle(HIDE_CLASS);

  if (isExpanded) {
    closeMenu();
  } else {
    openMenu();
  }
}
// Notification Key Navigation

function handleMenuItemArrowKeyPress(event, menuItemIndex) {
  const isLastMenuItem = menuItemIndex === allAlertMenuItems.length - 1;
  const isFirstMenuItem = menuItemIndex === 0;
  const nextMenuItem = allAlertMenuItems.item(menuItemIndex + 1);
  const prevMenuItem = allAlertMenuItems.item(menuItemIndex - 1);

  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    if (isLastMenuItem) {
      allAlertMenuItems.item(0).focus();
      return;
    }
    nextMenuItem.focus();
  }
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    if (isFirstMenuItem) {
      allAlertMenuItems.item(allAlertMenuItems.length - 1).focus();
      return;
    }
    prevMenuItem.focus();
  }
}

function handleAlertEscapeKey(event) {
  if (event.key === "Escape") {
    toggleAlert();
  }
}

function openAlertMenu() {
  notification.ariaExpanded = "true";
  allAlertMenuItems.item(0).focus();
  alert.addEventListener("keyup", handleAlertEscapeKey);

  allAlertMenuItems.forEach(function (menuItem, menuItemIndex) {
    menuItem.addEventListener("keyup", function (event) {
      handleMenuItemArrowKeyPress(event, menuItemIndex);
    });
  });
}
function closeAlertMenu() {
  notification.ariaExpanded = "false";
  notification.focus();

  alert.addEventListener("keyup", handleAlertEscapeKey);
}

function toggleAlert() {
  const isExpanded = notification.attributes["aria-expanded"].value === "true";
  alert.classList.toggle(HIDE_CLASS);

  if (isExpanded) {
    closeAlertMenu();
  } else {
    openAlertMenu();
  }
}

// Control Tab
const tabs = document.querySelectorAll("[role=tab]");
const tabList = document.querySelectorAll("[role= tablist]");

// Add Eventlistener to each tab
tabs.forEach((tab) => {
  tab.addEventListener("click", addActive);
});

let tabFocus = 0;
tabList.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
    tabs[tabFocus].setAttribute("tabindex", -1);
    if (e.key === "ArrowRight") {
      tabFocus++;
      //If last, go start
      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    } else if (e.key === "ArrowLeft") {
      tabFocus--;
      //If last, go start
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    }
    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
  }
});
