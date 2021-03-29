window.renderTemplate = function (alias, data) {
    if (alias in templates) {
        return templates[alias](data);
    }
    return 'Template not found';
}

const templates = {
    'activity': activity,
    'chart': chart,
    'diagram': diagram,
    'leaders': leaders,
    'vote': vote,
};

function activity(data) {
    const itemClass = (nth, commits) => {
        const isEven = nth % 2 == 0;
        return [
            'activity__map-item',
            isEven ? 'activity__map-even' : 'activity__map-odd',
            commits >= 1 && commits <= 2 ? 'activity__map-mid' : '',
            commits >= 3 && commits <= 4 ? 'activity__map-max' : '',
            commits >= 5 ? 'activity__map-extra' : '',
        ].join(' ');
    }

    const days = Object.values(data.data);

    const divsVertical = [];
    for (let i = 0; i < 24; i++) {
        days.forEach((hours) => {
            const commitsNum = hours[i];
            const className = itemClass(i + 1, commitsNum);
            divsVertical.push(`<div class="${className}"><div class="bar"></div></div>`)
        });
    }


    const divsHorisontal = [];
    days.forEach((hours, dayIdx) => {
        for (let i = 0; i < 24; i += 2) {
            const commitsNum = hours[i] + hours[i + 1];
            const className = itemClass(dayIdx + 1, commitsNum);
            divsHorisontal.push(`<div class="${className}"><div class="bar"></div></div>`);
        }
    })
    return `<div class="activity">
    <div class="container">
        <div class="title activity__title">${data.title}</div>
        <div class="subtitle activity__subtitle">${data.subtitle}</div>
        <div class="activity__map activity__map-vertical">
            ${divsVertical.join('')}
        </div>
        <div class="activity__wrapper">
            <div class="activity__content">
                <div class="activity__map activity__map-horisontal">
                    ${divsHorisontal.join('')}
                </div>
                <div class="activity__measures">
                    <div class="activity__measures-item">
                        <div class="activity__measures-scale">
                            <div class="activity__measures-vertical"></div>
                            <div class="activity__measures-horisontal"></div>
                            <div class="activity__measures-vertical"></div>
                        </div>
                        <div class="activity__measures-measure">1 час</div>
                    </div>
                    <div class="activity__measures-item">
                        <div class="activity__measures-color activity__measures-lightgray"></div>
                        <div class="activity__measures-measure">0</div>
                    </div>
                    <div class="activity__measures-item">
                        <div class="activity__measures-color activity__measures-gray"></div>
                        <div class="activity__measures-measure">1 — 2</div>
                    </div>
                    <div class="activity__measures-item">
                        <div class="activity__measures-color activity__measures-lightorange"></div>
                        <div class="activity__measures-measure">3 — 4</div>
                    </div>
                    <div class="activity__measures-item">
                        <div class="activity__measures-color activity__measures-orange"></div>
                        <div class="activity__measures-measure">5 — 6</div>
                    </div>
                </div>
            </div>
        </div>  
    </div>
</div>`;
}
const elements = document.querySelectorAll('.chart__item');
const elemNumbers = document.querySelectorAll('.chart__item-number');
const numbers = Array.from(elemNumbers).map((elem) => elem.textContent)
const maxNum = Math.max(...numbers);
elements.forEach((elem) => {
    const number = elem.querySelector('.chart__item-number').textContent;
    const column = elem.querySelector('.chart__item-column');
    column.style.height = number * 100 / maxNum + '%';
})


function chart(data) {
    const { title, subtitle, values, users } = data;
    const activeIdx = values.findIndex(({ active }) => active);
    const endIdx = activeIdx + 3;
    const startIdx = Math.max(0, endIdx - 9);
    const newValues = values.slice(startIdx, endIdx);
    const numbers = newValues.map(value => value.value);
    const maxNum = Math.max(...numbers);
    const items = newValues.map((value) => {
        const itemHeight = value.value * 100 / maxNum
        return `
        <div class="chart__item ${value.active ? 'chart__item-max' : ''}">
            <div class="chart__item-wrapper">
                <div class="chart__item-columnwrapper">
                    <div class="chart__item-number">${value.value > 0 ? value.value : ''}</div>
                    <div class="chart__item-column" style="height: ${itemHeight}%"></div>
                </div> 
            </div>
            <div class="chart__item-sprint">${value.title}</div>
        </div>
    `
    })

    const newUsers = users.slice(0, 2);
    const userItems = newUsers.map((user) => {
        return `
            <div class="chart__people-item">
                <img src="/img/2x/${user.avatar}" alt="" class="chart__people-img">
                <div class="chart__people-info">
                    <div class="chart__people-name">${user.name}</div>
                    <div class="chart__people-id">${user.id}</div>
                </div>    
            </div>
        `
    })
    return `<div class="chart">
    <div class="container">
        <div class="title chart__title">${title}</div>
        <div class="subtitle chart__subtitle">${subtitle}</div>
        <div class="chart__content">
            <div class="chart__wrapper">
                ${items.join('')}
            </div>
            <div class="chart__people">
                ${userItems.join('<div class="chart__devider"></div>')}
            </div>
        </div>
        
    </div>
</div>`
}

function diagram(data) {
    const { title, subtitle, totalText, differenceText, categories } = data
    const diagramItems = categories.map((category, i) => {
        return `
        <div class="diagram__data-item">
            <div class="diagram__data-circle diagram__data-circle${i + 1}"></div>
            <div class="diagram__data-interval">${category.title}</div>
            <div class="diagram__data-change">${category.differenceText.split(' ', 1)}</div>
            <div class="diagram__data-current">${parseInt(category.valueText)}</div>
        </div>
        
        `
    })
    return `
    <div class="diagram">
    <div class="container">
        <div class="title">${title}</div>
        <div class="subtitle">${subtitle}</div>
        <div class="diagram__content">
            <div class="diagram__wrapper">
                <div id="diagram_dark" class="diagram__diagram diagram__diagram-dark"></div>
                <div id="diagram_light" class="diagram__diagram diagram__diagram-light"></div>

                <div class="diagram__descr">
                    <div class="diagram__descr-title">${totalText}</div>
                    <div class="diagram__descr-subtitle">${differenceText}</div>
                </div>
            </div>
            <div class="diagram__data">
                ${diagramItems.join('<div class="diagram__data-devider"></div>')}
            </div>
        </div>
    </div>
</div>   `
}

const lightGradients = [
    (() => {
        let gradient = new am4core.RadialGradient();
        gradient.addColor(am4core.color('#fec75c'), 1, 0.7);
        gradient.addColor(am4core.color('#ffd86f'), 1, 0.8);
        gradient.addColor(am4core.color('#ffebb2'), 1, 0.9);
        gradient.addColor(am4core.color('#ffdea7'), 1, 1);
        return gradient;
    })(),
    (() => {
        let gradient = new am4core.RadialGradient();
        gradient.addColor(am4core.color('#fee3ab'), 1, 0.7);
        gradient.addColor(am4core.color('#feefc4'), 1, 0.8);
        gradient.addColor(am4core.color('#fff8dd'), 1, 0.9);
        gradient.addColor(am4core.color('#fff3d6'), 1, 1);
        return gradient;
    })(),
    (() => {
        let gradient = new am4core.RadialGradient();
        gradient.addColor(am4core.color('#e6e6e7'), 1, 0.7);
        gradient.addColor(am4core.color('#f0f0f1'), 1, 0.8);
        gradient.addColor(am4core.color('#fafafb'), 1, 0.9);
        gradient.addColor(am4core.color('#ededee'), 1, 1);
        return gradient;
    })(),
    (() => {
        let gradient = new am4core.RadialGradient();
        gradient.addColor(am4core.color('#ededee'), 1, 0.7);
        gradient.addColor(am4core.color('#e8e8e9'), 1, 0.8);
        gradient.addColor(am4core.color('#f7f7f9'), 1, 0.9);
        gradient.addColor(am4core.color('#dcdbdc'), 1, 1);
        return gradient;
    })(),
];

const darkGradients = [
    (() => {
        let gradient = new am4core.RadialGradient();
        gradient.addColor(am4core.color('#e99603'), 1, 0.7);
        gradient.addColor(am4core.color('#986306'), 1, 0.85);
        gradient.addColor(am4core.color('#805405'), 1, 0.90);
        gradient.addColor(am4core.color('#805405'), 1, 0.94);
        gradient.addColor(am4core.color('#925f05'), 1, 0.98);
        gradient.addColor(am4core.color('#cbad78'), 1, 1);
        return gradient;
    })(),
    (() => {
        let gradient = new am4core.RadialGradient();
        gradient.addColor(am4core.color('#7e5205'), 1, 0.7);
        gradient.addColor(am4core.color('#352305'), 1, 0.85);
        gradient.addColor(am4core.color('#2c1e05'), 1, 0.90);
        gradient.addColor(am4core.color('#2c1e05'), 1, 0.94);
        gradient.addColor(am4core.color('#523503'), 1, 0.98);
        gradient.addColor(am4core.color('#b09e7f'), 1, 1);
        return gradient;
    })(),
    (() => {
        let gradient = new am4core.RadialGradient();
        gradient.addColor(am4core.color('#6d6c6b'), 1, 0.7);
        gradient.addColor(am4core.color('#413c31'), 1, 0.85);
        gradient.addColor(am4core.color('#363020'), 1, 0.90);
        gradient.addColor(am4core.color('#363020'), 1, 0.94);
        gradient.addColor(am4core.color('#4c4639'), 1, 0.98);
        gradient.addColor(am4core.color('#8a8880'), 1, 1);
        return gradient;
    })(),
    (() => {
        let gradient = new am4core.RadialGradient();
        gradient.addColor(am4core.color('#969696'), 1, 0.7);
        gradient.addColor(am4core.color('#32312f'), 1, 0.71);
        gradient.addColor(am4core.color('#322d22'), 1, 0.85);
        gradient.addColor(am4core.color('#302a1b'), 1, 0.90);
        gradient.addColor(am4core.color('#2c2514'), 1, 0.94);
        gradient.addColor(am4core.color('#292315'), 1, 0.98);
        gradient.addColor(am4core.color('#83817a'), 1, 1);
        return gradient;
    })(),
];

const initDiagram = (chartId, categories, isLight = false) => {
    const fills = isLight ? lightGradients : darkGradients;
    const stroke = isLight ? '#fff' : '#000';

    const diagram = am4core.create(chartId, am4charts.PieChart);

    diagram.data = categories.map((cat, idx) => {
        return {
            name: cat.title,
            value: parseInt(cat.valueText),
            fill: fills[idx],
        };
    })

    const pie = diagram.series.push(new am4charts.PieSeries());

    pie.dataFields.value = 'value';
    pie.dataFields.category = 'name';
    pie.radius = am4core.percent(110);
    pie.innerRadius = am4core.percent(77);

    pie.ticks.template.disabled = true;
    pie.labels.template.disabled = true;

    const sliceTemplate = pie.slices.template;
    sliceTemplate.stroke = am4core.color(stroke);
    sliceTemplate.strokeWidth = 2;
    sliceTemplate.cornerRadius = 6;

    sliceTemplate.propertyFields.fill = 'fill';

    sliceTemplate.states.getKey('hover').properties.scale = 1;
    sliceTemplate.states.getKey('active').properties.shiftRadius = 0;

}

const diagramObserver = new MutationObserver(list => {
    const diagramData = document.querySelector('.diagram__data');

    if (!diagramData || diagramData.classList.contains('processed')) {
        return;
    }

    const categoriesEls = diagramData.querySelectorAll('.diagram__data-item');
    const categories = Array.from(categoriesEls).map(el => {
        return {
            title: el.querySelector('.diagram__data-interval').textContent,
            valueText: el.querySelector('.diagram__data-current').textContent,
        };
    });

    diagramData.classList.add('processed');
    initDiagram('diagram_dark', categories);
    initDiagram('diagram_light', categories, true);
});
diagramObserver.observe(document.body, { childList: true, subtree: true });

function leaders(data) {
    const { title, subtitle, selectedUserId, emoji, users } = data;
    const leaderUsers = users.slice(0, 5);
    const selectedUserIdx = users.findIndex(user => user.id == selectedUserId)
    if (selectedUserIdx > 4) {
        leaderUsers[4] = users[selectedUserIdx];
    }
    const leaderItems = leaderUsers.map((user, i) => {
        let userEmoji = ''
        if (i == 0) {
            userEmoji = emoji
        }
        if (user.id == selectedUserId) {
            userEmoji = "👍"
        }
        return `
            <div class="leaders__item leaders__item-${i + 1} ${selectedUserId == user.id ? 'leaders__item-favourite' : ''}">
                <div class="leaders__people">
                <div class="leaders__people-emoji">${userEmoji}</div>
                    <img srcset="img/1x/${user.avatar} 64w,
                                img/2x/${user.avatar} 128w,
                                img/3x/${user.avatar}"
                        sizes="(max-width: 767px) 64px,
                                (max-width: 1365) 128px,
                                1366px"
                        src="img/1x/${user.avatar}" alt="first" class="leaders__people-img">    
                    <div class="leaders__people-name"><span>${user.name}</span></div>
                    <div class="leaders__people-id">${selectedUserId ? user.valueText : user.id}</div>
                </div>
                <div class="leaders__devider"></div>
                <div class="leaders__bar">
                    <div class="leaders__bar-place">${selectedUserId == user.id ? selectedUserIdx + 1 : i + 1}</div>
                </div>
            </div>
        `
    })
    return `
    <div class="leaders">
    <div class="container">
        <h1 class="title leaders__title">${title}</h1>
        <h2 class="subtitle leaders__subtitle">${subtitle}</h2>
        <div class="leaders__wrapper">
           ${leaderItems.join('')}
        </div>
    </div>
</div>`
}

function vote(data) {
    const { title, subtitle, selectedUserId, offset = 0, users } = data;
    const newVote = users.slice(offset, offset + 8);
    const voteItems = newVote.map((user, i) => {
        const dataParams = encodeURIComponent(JSON.stringify({
            alias: 'leaders',
            data: {
                selectedUserId: user.id,
            }
        }))
        return `
        <div class="vote__item vote__item-${i + 1} ${selectedUserId == user.id ? 'vote__item-favourite' : ''}" 
            data-action="update" 
            data-params="${dataParams}">
            <div class="vote__item-emoji">${user.id == selectedUserId ? '👍' : ''}</div>
            <img srcset="img/1x/${user.avatar} 64w,
                            img/2x/${user.avatar} 128w,
                            img/3x/${user.avatar}"
                    sizes="(max-width: 767px) 64px,
                            (max-width: 1365) 128px,
                            1366px"
                    src="img/1x/${user.avatar}" alt="first" class="vote__item-img">
            <div class="vote__item-name"><span>${user.name}</span></div>
        </div>
        `
    })

    const renderArrow = (direction, orientation) => {
        let actionAttrs = '';
        let className = `vote__arrow-${direction}${orientation}`;
        let step = 6;
        if (orientation == 'vertical') {
            step = 8
        }
        if (direction == 'up') {
            step *= -1;
        }
        const nextOffset = Math.max(offset + step, 0);

        const isDisabled = nextOffset >= users.length || (offset == 0 && direction == 'up')
        if (isDisabled) {
            className += ' vote__arrow-disabled';
        } else {
            const dataParams = {
                alias: 'vote',
                data: {
                    offset: nextOffset
                }
            };
            actionAttrs = `data-action="update" data-params=${JSON.stringify(dataParams)}`;
        }
        return `
        <div class="vote__arrow ${className}" ${actionAttrs}>
            <svg fill="none" height="64" viewBox="0 0 64 64" width="64" xmlns="http://www.w3.org/2000/svg">
                <path clip-rule="evenodd" d="m32 62c16.5685 0 30-13.4315 30-30s-13.4315-30-30-30-30 13.4315-30 30 13.4315 30 30 30zm0 2c17.6731 0 32-14.3269 32-32s-14.3269-32-32-32-32 14.3269-32 32 14.3269 32 32 32zm27-32c0 14.9117-12.0883 27-27 27s-27-12.0883-27-27 12.0883-27 27-27 27 12.0883 27 27zm-33.9393-4.0607c-.5858-.5857-1.5356-.5857-2.1214 0-.5857.5858-.5857 1.5356 0 2.1214l8 8c.5858.5857 1.5356.5857 2.1214 0l8-8c.5857-.5858.5857-1.5356 0-2.1214-.5858-.5857-1.5356-.5857-2.1214 0l-6.9393 6.9394z" fill-rule="evenodd"/>
            </svg>  
        </div>
        `
    }

    return `
    <div class="vote">
    <div class="container">
        <div class="title vote__title">${title}</div>
        <div class="subtitle vote__subtitle">${subtitle}</div>
        <div class="vote__wrapper">
            ${renderArrow('up', 'vertical')}
            ${renderArrow('up', 'horisontal')}
            ${renderArrow('down', 'vertical')}
            ${renderArrow('down', 'horisontal')}
            ${voteItems.join('')}
        </div>
    </div>
</div>
    `
}
