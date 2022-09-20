const svg = `
    <svg class="events__info--icon" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 10" id="location">
        <path d="M3.77344 0C1.69278 0 0 1.55933 0 3.47595C0 5.88495 3.77715 10 3.77715 10C3.77715 10 7.54687 5.76648 7.54687 3.47595C7.54687 1.55933 5.85416 0 3.77344 0ZM4.91196 4.49371C4.59803 4.78284 4.18577 4.92743 3.77344 4.92743C3.36118 4.92743 2.94878 4.78284 2.63498 4.49371C2.00718 3.91547 2.00718 2.97455 2.63498 2.39624C2.93897 2.11609 3.34335 1.96179 3.77344 1.96179C4.20352 1.96179 4.60783 2.11615 4.91196 2.39624C5.53976 2.97455 5.53976 3.91547 4.91196 4.49371Z" fill="white"></path>
    </svg>
`;

export function createEventCard(event, i) {
    return `
        <li class="events__card " id="${i}">
            <div class="events__poster">
                <div class="events__poster--decor"></div>
                <img src="${event.images.find(e => e.height >= 400 && e.height <= 600).url}" alt="poster" class="events__poster--img">
            </div>
            <div class="events__info">
                <h2 class="events__info--title">${event.name}</h2>
                <p class="events__info--date">${event.dates.start.localDate}</p>
                <p class="events__info--place">
                    ${svg}
                    ${event?._embedded?.venues[0]?.address?.line1 ? event._embedded.venues[0].address.line1 : 'Secret Place'}
                </p>
            </div>
        </li>
    `;
};