const TOKEN = "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";
const REPO = "MR-Zea/Imagelink";
const BRANCH = "main";
const PATH = "uploads/";

document.getElementById("file").addEventListener("change", async function() {
  const file = this.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = async function() {
    const base64 = reader.result.split(",")[1];
    const fileName = Date.now() + ".png";

    const url = `https://api.github.com/repos/${REPO}/contents/${PATH}${fileName}`;

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        "Authorization": "Bearer " + TOKEN,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: "upload image",
        content: base64,
        branch: BRANCH
      })
    });

    const data = await res.json();

    const vercelLink = `https://${location.hostname}/uploads/${fileName}`;

    document.getElementById("result").innerHTML = `
      <p>Berhasil Upload ✅</p>
      <img src="${vercelLink}">
      <a href="${vercelLink}" target="_blank">${vercelLink}</a>
    `;
  };

  reader.readAsDataURL(file);
});
