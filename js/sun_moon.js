function switchNightMode() {
  document.querySelector("body").insertAdjacentHTML("beforeend", '<div class="Cuteen_DarkSky"><div class="Cuteen_DarkPlanet"><div id="sun"></div><div id="moon"></div></div></div>');
  
  setTimeout(() => {
    if (document.querySelector("body").classList.contains("DarkMode")) {
      document.querySelector("body").classList.remove("DarkMode");
      localStorage.setItem("isDark", "0");
      document.getElementById("modeicon").setAttribute("xlink:href", "#icon-moon");
    } else {
      document.querySelector("body").classList.add("DarkMode");
      localStorage.setItem("isDark", "1");
      document.getElementById("modeicon").setAttribute("xlink:href", "#icon-sun");
    }

    setTimeout(() => {
      document.getElementsByClassName("Cuteen_DarkSky")[0].style.transition = "opacity 3s";
      document.getElementsByClassName("Cuteen_DarkSky")[0].style.opacity = "0";
      setTimeout(() => {
        document.getElementsByClassName("Cuteen_DarkSky")[0].remove();
      }, 1000);
    }, 2000);
  });

  if ("light" === ("dark" === document.documentElement.getAttribute("data-theme") ? "dark" : "light")) {
    document.getElementById("sun").style.opacity = "1";
    document.getElementById("moon").style.opacity = "0";
    setTimeout(() => {
      document.getElementById("sun").style.opacity = "0";
      document.getElementById("moon").style.opacity = "1";
    }, 1000);

    activateDarkMode();
    saveToLocal.set("theme", "dark", 2);
    document.getElementById("modeicon").setAttribute("xlink:href", "#icon-sun");

    setTimeout(() => {
      if (GLOBAL_CONFIG.Snackbar !== undefined) {
        anzhiyu.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
      }
    }, 2000);
  } else {
    document.getElementById("sun").style.opacity = "0";
    document.getElementById("moon").style.opacity = "1";
    setTimeout(() => {
      document.getElementById("sun").style.opacity = "1";
      document.getElementById("moon").style.opacity = "0";
    }, 1000);

    activateLightMode();
    saveToLocal.set("theme", "light", 2);
    document.querySelector("body").classList.add("DarkMode");
    document.getElementById("modeicon").setAttribute("xlink:href", "#icon-moon");

    setTimeout(() => {
      if (GLOBAL_CONFIG.Snackbar !== undefined) {
        anzhiyu.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
      }
    }, 2000);
  }

  if (typeof utterancesTheme === "function") utterancesTheme();
  if (typeof FB === "object") window.loadFBComment();
  if (window.DISQUS && document.getElementById("disqus_thread").children.length) setTimeout(() => window.disqusReset(), 200);
}