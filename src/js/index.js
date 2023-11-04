const artWork = async () => {

    let headers = new Headers([
        ['Content-Type', 'application/json'],
        ['Accept', 'application/json']
    ]);

    let request = new Request(`https://api.artic.edu/api/v1/artworks?page=2&limit=10`, {
        method: 'GET',
    });

    const response = await fetch(request);
    const json = await response.json();

    let list = ``;
    await json.data.forEach((art) => {

        list += `
            <section>
                <h2>title: ${art.title}</h2>
                <ul>
                    <li>id: ${art.id}</li>
                    <li>type of art: ${art.artwork_type_title}</li>
                    <li>artist: ${art.artist_title}</li>
                    <li>artist desc: ${art.artist_display}</li>
                    <li>api_link: ${art.api_link}</li>
                    <li>place of origin: ${art.place_of_origin}</li>
                </ul>
                <ul id="${art.id} class="tagsArt"/>
        `;
        const terms = art.term_titles;
        if(terms !== undefined && terms.length !== 0) {
            list += `tags:`;
            list += `<ul>`;
            terms.forEach((term) => {
                list += `<li>${term}</li>`
            });
            list += `</ul>`;
        };
        list += `<img 
                    src="https://www.artic.edu/iiif/2/${art.image_id}/full/843,/0/default.jpg"
                    alt="${art.title}" 
                    style="width:196px;height:196px;"
                >
            </section>`;
    });
    document.querySelector("p").innerHTML = list;
}
