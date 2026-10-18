import {
  DEFAULT_THEME,
  THEME_CHANGE_EVENT,
  THEME_MEDIA_QUERY,
  THEME_STORAGE_KEY,
} from "@/lib/theme/constants";

// Runs in <head> before first paint. It owns applying the theme to <html>,
// and re-applies on OS preference changes, other tabs, and setTheme() calls.
export const themeScript = `(function(){
  let d=document.documentElement,m=matchMedia("${THEME_MEDIA_QUERY}");
  function apply(){
    let t;
    try{t=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){}
    if(t!=="light"&&t!=="dark"&&t!=="system")t="${DEFAULT_THEME}";
    let r=t==="system"?(m.matches?"light":"dark"):t;
    d.classList.toggle("light",r==="light");
    d.style.colorScheme=r;
  }
  apply();
  m.addEventListener("change",apply);
  addEventListener("${THEME_CHANGE_EVENT}",apply);
  addEventListener("storage",function(e){if(e.key==="${THEME_STORAGE_KEY}")apply()});
})()`;
