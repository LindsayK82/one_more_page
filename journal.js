document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('journal-entries');
  if (!container) return;
  const entries = Array.isArray(window.journalEntries) ? [...window.journalEntries] : [];
  entries.sort((a, b) => String(b.date).localeCompare(String(a.date)));
  container.replaceChildren();
  if (!entries.length) {
    const message = document.createElement('p');
    message.textContent = 'Our first journal entry is coming soon. Check back for updates!';
    container.append(message);
    return;
  }
  for (const entry of entries) {
    const article = document.createElement('article');
    article.className = 'journal-entry';
    const time = document.createElement('time');
    time.className = 'journal-date';
    time.dateTime = entry.date;
    const parsedDate = new Date(`${entry.date}T12:00:00`);
    time.textContent = Number.isNaN(parsedDate.getTime()) ? entry.date : parsedDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const title = document.createElement('h2');
    title.textContent = entry.title;
    article.append(time, title);
    for (const paragraph of (entry.paragraphs || [])) {
      const p = document.createElement('p');
      p.textContent = paragraph;
      article.append(p);
    }
    container.append(article);
  }
});
