//collect current window's open tabs, prepare content , copy to clipboard
document.getElementById('btn').addEventListener('click', function () {
    chrome.tabs.query({ currentWindow: true }, function (tabs) {
        let tablinks = '';
        for (let i = 0; i < tabs.length; i++) {
            tablinks += `<p><a href="${tabs[i].url}">${tabs[i].title}</a></p>`;
        }
        copyLinksToClipboardAsHTML(tablinks);
    });
});

function copyLinksToClipboardAsHTML(html) {
    function copyEventHandler(e) {
        document.removeEventListener('copy', copyEventHandler, true);
        e.stopImmediatePropagation();
        e.preventDefault();
        e.clipboardData.setData('text/plain', html);
        e.clipboardData.setData('text/html', html);
    }
    document.addEventListener('copy', copyEventHandler, true);
    document.execCommand('copy');
}
