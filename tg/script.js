const URL_REGEX = /^tg:\/\/[^\s<>"']+$/;

function append(link) {
  const div = document.createElement("div");
  div.classList.add("link");
  const a = document.createElement("a");
  a.textContent = link;
  a.href = link;
  div.appendChild(a);
  return div;
}

function error(text) {
  const div = document.createElement("div");
  div.classList.add("link", "error");
  div.textContent = text;
  return div;
}

async function reload() {
  const links = document.getElementById("links");
  const button = document.getElementById("button");
  button.disabled = true;

  const responses = await Promise.allSettled(
    [
      "https://raw.githubusercontent.com/kort0881/telegram-proxy-collector/main/proxy_ru.txt",
      "https://raw.githubusercontent.com/kort0881/telegram-proxy-collector/main/proxy_eu.txt",
      "https://raw.githubusercontent.com/SoliSpirit/mtproto/master/all_proxies.txt",
    ].map((url) => fetch(url)),
  );
  for (const response of responses.map((r) => r.value)) {
    if (!(await response.ok)) {
      const div = error(
        `${await response.url}: Error ${await response.status}`,
      );
      links.appendChild(div);
      continue;
    }

    const text = await response.text();
    for (const line of text.split("\n")) {
      if (!URL_REGEX.test(line)) {
        continue;
      }

      const div = append(line);
      links.appendChild(div);
    }
  }
}
