'use strict';

module.exports.toTitleCase = (name) => {
    const nameTemp = name.split(' ');

    for (let i = 0; i < nameTemp.length; i++) {
        let j = nameTemp[i].charAt(0).toUpperCase();

        nameTemp[i] = j + nameTemp[i].substr(1);
    }

    return nameTemp.join(' ');
}