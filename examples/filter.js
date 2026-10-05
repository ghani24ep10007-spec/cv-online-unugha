const cards = [...document.querySelectorAll(".record-card")];

function filterProjects(query) {
  const term = query.trim().toLocaleLowerCase("id");

  return cards
    .map((card) => ({
      card,
      title: card.querySelector("h3").textContent
    }))
    .filter(({ title }) =>
      title.toLocaleLowerCase("id").includes(term)
    );
}

const matches = filterProjects("jadwal");
console.log(matches.map(({ title }) => title));
// ["Daftar Jadwal Kuliah"]