import cheerio from 'cheerio';
import superagent from 'superagent';

const getHtml = async url => {
  const html = await superagent.get(url);
  return html.res.text;
};

/**
 * Gets the weekly lunch menu from kista.eatery.se
 */
const getMenu = async () => {
  const data = await getHtml('http://kista.eatery.se');
  const $ = cheerio.load(data);
  const fullSidebar = $('.sidebar').text();
  const sideBar = fullSidebar.split(/(Måndag|Tisdag|Onsdag|Torsdag|Fredag)\b/g);
  const weekDays = ['Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag'];
  const fullJson = {};
  const formattedDays = [];
  for (let i = 0; i < sideBar.length; i++) {
    fullJson[weekDays[i]] = {};
    if (i % 2 === 0 && i !== 0) {
      // let weekday = i - 2;
      let formatedDay = sideBar[i].split('\n', 6);
      formatedDay = formatedDay.filter(e => e !== '');
      formatedDay.pop();

      for (let j = 0; j < formatedDay.length; j++) {
        formatedDay[j].split(': ', 3);
      }
      formattedDays.push(formatedDay);
    }
  }
  const menu = {};
  for (let i = 0; i < formattedDays.length; i++) {
    menu[weekDays[i]] = formattedDays[i];
  }
  // Below is very static and may need a change
  menu.Fredag.pop();
  return menu;
};
module.exports = {
  getMenu,
};
