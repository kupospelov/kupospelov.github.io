const URL_REGEX = /^tg:\/\/[^\s<>"']+$/g;

function reload() {
  const links = document.getElementById("links");
  const button = document.getElementById("button");
  button.disabled = true;

  fetch(
    "https://raw.githubusercontent.com/kort0881/telegram-proxy-collector/main/proxy_ru.txt",
  )
    .then((r) => {
      if (!r.ok) throw new Error(`${r.status}`);
      return r.text();
    })
    .then((text) => {
      for (const line of text.split("\n")) {
        if (!URL_REGEX.test(line)) {
          continue;
        }

        const a = document.createElement("a");
        a.href = line;
        a.textContent = line;
        links.appendChild(a);
      }
    })
    .catch((e) => {
      const a = document.createElement("a");
      a.textContent = e;
      links.appendChild(a);
    });
}
