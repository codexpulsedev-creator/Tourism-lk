const fs = require('fs');
const https = require('https');
const path = require('path');

const filesToDownload = [
  // 1. Maha Oya Hot Water Springs
  { wikiFile: 'Maha oya Hot water springs.jpg', localFile: 'maha-oya-hot-springs-wells.jpg' },

  // 2. Tri-Forces Museum (Sri Lanka Air Force & Defence Museum)
  { wikiFile: 'Sri Lanka Air Force Museum (16508970775).jpg', localFile: 'tri-forces-museum-exterior-aircraft.jpg' },
  { wikiFile: 'Mil-24 at the Sri Lankan Air Force Museum..JPG', localFile: 'tri-forces-museum-mil24-helicopter.jpg' },
  { wikiFile: 'PSX 20190611 133800.jpg', localFile: 'tri-forces-museum-hangar-exhibit.jpg' },
  { wikiFile: 'PSX 20190611 133425.jpg', localFile: 'tri-forces-museum-aircraft-display.jpg' },
  { wikiFile: 'PSX 20190611 133217.jpg', localFile: 'tri-forces-museum-interior-gallery.jpg' },

  // 3. Namal Angana / Jathika Namal Uyana Viharaya
  { wikiFile: 'Jathika Namal Uyana , ජාතික නාමල් උයන.jpg', localFile: 'namal-angana-temple-shrine.jpg' },
  { wikiFile: 'Jathika Namal Uyana or ජාතික නාමල් උයන.jpg', localFile: 'namal-angana-ancient-stupa.jpg' },
  { wikiFile: 'Jathika Namal Uyana or pink quartz mountain.jpg', localFile: 'namal-angana-sacred-forest.jpg' },
  { wikiFile: 'Jathika Namal Uyana or pink crystal mountain.jpg', localFile: 'namal-angana-temple-grounds.jpg' },
  { wikiFile: 'Kashyapa of Anuradhapura.jpg', localFile: 'namal-angana-monastic-ruins.jpg' },

  // 4. Arantalawa Peace Memorial & Viharaya
  { wikiFile: 'Monument of Aranthalawa Massacre.jpg', localFile: 'arantalawa-peace-memorial.jpg' },
  { wikiFile: 'Mahavapi Vihara.jpg', localFile: 'arantalawa-mahavapi-viharaya.jpg' },

  // 5. Munneswaram Kovil
  { wikiFile: 'Munneswaram.jpg', localFile: 'munneswaram-kovil-gopuram.jpg' },
  { wikiFile: 'Munneswaram Sivan temple inner sanctorum.jpg', localFile: 'munneswaram-kovil-sanctum.jpg' },
  { wikiFile: 'Munneswaram Ganesha.jpg', localFile: 'munneswaram-kovil-ganesha.jpg' },
  { wikiFile: 'Munneswaram Sharabha.jpg', localFile: 'munneswaram-kovil-sharabha.jpg' },
  { wikiFile: 'Munneswaram Narasimha.jpg', localFile: 'munneswaram-kovil-narasimha.jpg' },

  // 6. Seruwawila Mangala Raja Maha Viharaya
  { wikiFile: 'Seruvila Mangala Raja Maha Viharaya.jpg', localFile: 'seruwawila-stupa-main.jpg' },
  { wikiFile: 'Seruwawila temple.jpg', localFile: 'seruwawila-temple-ruins.jpg' },
  { wikiFile: 'Seruvila lotus pooja 3.jpg', localFile: 'seruwawila-lotus-pooja.jpg' },

  // 7. Nilaveli Beach
  { wikiFile: 'Nillaveli Beach.JPG', localFile: 'nilaveli-beach-white-sands.jpg' },
  { wikiFile: 'Blogger & Solobackpacker Adventurer tourist Mr Rudolph.A.Furtado at Nilaveli beach..jpg', localFile: 'nilaveli-beach-coastline.jpg' },
  { wikiFile: 'Man with Firewood, Nilaveli Beach.jpg', localFile: 'nilaveli-beach-pigeon-island-view.jpg' },
  { wikiFile: 'Ruins of Hotel Destroyed, Nilaveli Beach.jpg', localFile: 'nilaveli-beach-shore.jpg' },

  // 8. Mirissa Coconut Tree Hill
  { wikiFile: 'Mirissa Beach Coconut Tree hills.jpg', localFile: 'mirissa-coconut-tree-hill-hills.jpg' },
  { wikiFile: 'Amazing Coconut Tree Hill.jpg', localFile: 'mirissa-coconut-tree-hill-amazing.jpg' },
  { wikiFile: 'Coconut Tree Hill.jpg', localFile: 'mirissa-coconut-tree-hill-view.jpg' },
  { wikiFile: 'Coconut Tree Hill (2).jpg', localFile: 'mirissa-coconut-tree-hill-ocean.jpg' },
  { wikiFile: 'Coconut Tree Hill Beauty.jpg', localFile: 'mirissa-coconut-tree-hill-beauty.jpg' },

  // 9. Sigiriya Lion Rock
  { wikiFile: 'Sigiriya.jpg', localFile: 'sigiriya-lion-rock-monumental.jpg' },
  { wikiFile: 'Sigiriya 02.jpg', localFile: 'sigiriya-lion-rock-vista.jpg' },
  { wikiFile: 'Sigiriya Lion Rock Aerial (175658393).jpeg', localFile: 'sigiriya-lion-rock-aerial.jpg' },
  { wikiFile: 'Sigiriya- the all mighty.jpg', localFile: 'sigiriya-lion-rock-mighty.jpg' },

  // 10. Kandy
  { wikiFile: 'Royal Botanic Gardens, Peradeniya.jpg', localFile: 'kandy-botanical-gardens-peradeniya.jpg' },
  { wikiFile: 'Royal Botanical Gardens serre des orchidées de Peradeniya.jpg', localFile: 'kandy-botanical-gardens-orchid.jpg' },

  // 11. Nuwara Eliya
  { wikiFile: 'Gregory Lake Nuwara Eliya 01.jpg', localFile: 'nuwara-eliya-gregory-lake-1.jpg' },
  { wikiFile: 'Gregory Lake Nuwara Eliya 02.jpg', localFile: 'nuwara-eliya-gregory-lake-2.jpg' },
  { wikiFile: 'Gregory lake- Gregory park - Nuwara Eliya ~ Srilanka.jpg', localFile: 'nuwara-eliya-gregory-lake-park.jpg' }
];

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function fetchFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const options = {
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: {
        'User-Agent': 'TourismSriLankaEducationalApp/1.0 (contact@srilankatourism.test)',
        'Accept': 'image/jpeg,image/png,image/*,*/*'
      }
    };
    https.get(options, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = 'https://' + parsed.hostname + redirectUrl;
        }
        fetchFile(redirectUrl, destPath).then(resolve).catch(reject);
      } else if (res.statusCode === 200) {
        const file = fs.createWriteStream(destPath);
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            const sz = fs.statSync(destPath).size;
            if (sz > 0) resolve(sz);
            else {
              fs.unlinkSync(destPath);
              reject(new Error('0 byte file'));
            }
          });
        });
      } else {
        reject(new Error(`Status: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
}

async function run() {
  const destDir = path.join(__dirname, '../public/images/destinations');
  for (let i = 0; i < filesToDownload.length; i++) {
    const item = filesToDownload[i];
    const target = path.join(destDir, item.localFile);
    if (fs.existsSync(target) && fs.statSync(target).size > 1000) {
      console.log(`[${i + 1}/${filesToDownload.length}] Exists: ${item.localFile} (${Math.round(fs.statSync(target).size / 1024)} KB)`);
      continue;
    }
    const filePathUrl = `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(item.wikiFile)}`;
    console.log(`[${i + 1}/${filesToDownload.length}] Fetching ${item.localFile} from Special:FilePath...`);
    try {
      const sz = await fetchFile(filePathUrl, target);
      console.log(`✓ Downloaded ${item.localFile} (${Math.round(sz / 1024)} KB)`);
    } catch (e) {
      console.error(`Failed ${item.localFile}:`, e.message);
    }
    await sleep(1500);
  }
  console.log('Finished processing all files!');
}

run();
