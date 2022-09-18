export function createEventCard(event) {
    console.log(event.images)
    return `
        <li class="events__card">
            <div class="events__poster">
                <div class="events__poster--decor"></div>
                <img src="${event.images.find(e => e.height >= 600).url}" alt="poster" class="events__poster--img">
            </div>
            <div class="events__info">
                <h2 class="events__info--title">${event.name}</h2>
                <p class="events__info--date">${event.dates.start.localDate}</p>
                <p class="events__info--place">
                    <svg class="events__info--icon">
                        <use xlink:href="sprite.svg#location"></use>
                    </svg>
                    ${event.dates.timezone ? event.dates.timezone : 'Secret Place'}
                </p>
            </div>
        </li>
    `;
};