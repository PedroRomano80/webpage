(function () {
  // Substitui pelo teu ID de medição do Google Analytics (formato G-XXXXXXXXXX)
  const GA_MEASUREMENT_ID = "G-4SVNJJDS9T";

  function loadAnalytics() {
    if (window.gaLoaded) return;
    window.gaLoaded = true;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://www.googletagmanager.com/gtag/js?id=" + GA_MEASUREMENT_ID;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    window.gtag = gtag;
    gtag("js", new Date());
    gtag("config", GA_MEASUREMENT_ID);
  }

  function showBanner() {
    const banner = document.getElementById("cookie-banner");
    if (banner) banner.style.display = "flex";
  }

  function hideBanner() {
    const banner = document.getElementById("cookie-banner");
    if (banner) banner.style.display = "none";
  }

  document.addEventListener("DOMContentLoaded", function () {
    const consent = localStorage.getItem("cookie_consent");

    if (consent === "accepted") {
      loadAnalytics();
    } else if (consent !== "declined") {
      showBanner();
    }

    const acceptBtn = document.getElementById("cookie-accept");
    const declineBtn = document.getElementById("cookie-decline");

    if (acceptBtn) {
      acceptBtn.addEventListener("click", function () {
        localStorage.setItem("cookie_consent", "accepted");
        hideBanner();
        loadAnalytics();
      });
    }

    if (declineBtn) {
      declineBtn.addEventListener("click", function () {
        localStorage.setItem("cookie_consent", "declined");
        hideBanner();
      });
    }
  });
})();
