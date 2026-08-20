const fs = require('fs');
const https = require('https');
const path = require('path');

const downloads = [
  // 1. Maha Oya Hot Water Springs
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/66/Maha_oya_Hot_water_springs.jpg',
    filename: 'maha-oya-hot-springs-wells.jpg'
  },
  // 2. Tri-Forces Museum
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Sri_Lanka_Air_Force_Museum_%2816508970775%29.jpg',
    filename: 'tri-forces-museum-exterior-aircraft.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Mil-24_at_the_Sri_Lankan_Air_Force_Museum..JPG',
    filename: 'tri-forces-museum-mil24-helicopter.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/PSX_20190611_133800.jpg',
    filename: 'tri-forces-museum-hangar-exhibit.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/be/PSX_20190611_133425.jpg',
    filename: 'tri-forces-museum-aircraft-display.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/PSX_20190611_133217.jpg',
    filename: 'tri-forces-museum-interior-gallery.jpg'
  },
  // 3. Namal Angana / Jathika Namal Uyana Viharaya
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0a/Jathika_Namal_Uyana_%2C_%E0%B6%A2%E0%B7%8F%E0%B6%AD%E0%B7%92%E0%B6%9A_%E0%B6%B1%E0%B7%8F%E0%B6%B8%E0%B6%BD%E0%B7%8A_%E0%B6%8B%E0%B6%BA%E0%B6%B1.jpg',
    filename: 'namal-angana-temple-shrine.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Jathika_Namal_Uyana_or_%E0%B6%A2%E0%B7%8F%E0%B6%AD%E0%B7%92%E0%B6%9A_%E0%B6%B1%E0%B7%8F%E0%B6%B8%E0%B6%BD%E0%B7%8A_%E0%B6%8B%E0%B6%BA%E0%B6%B1.jpg',
    filename: 'namal-angana-ancient-stupa.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/Jathika_Namal_Uyana_or_pink_quartz_mountain.jpg',
    filename: 'namal-angana-sacred-forest.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/91/Jathika_Namal_Uyana_or_pink_crystal_mountain.jpg',
    filename: 'namal-angana-temple-grounds.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Kashyapa_of_Anuradhapura.jpg',
    filename: 'namal-angana-monastic-ruins.jpg'
  },
  // 4. Arantalawa Peace Memorial & Viharaya
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/Monument_of_Aranthalawa_Massacre.jpg',
    filename: 'arantalawa-peace-memorial.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Mahavapi_Vihara.jpg',
    filename: 'arantalawa-mahavapi-viharaya.jpg'
  },
  // 5. Munneswaram Kovil
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Munneswaram.jpg',
    filename: 'munneswaram-kovil-gopuram.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Munneswaram_Sivan_temple_inner_sanctorum.jpg',
    filename: 'munneswaram-kovil-sanctum.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Munneswaram_Ganesha.jpg',
    filename: 'munneswaram-kovil-ganesha.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ed/Munneswaram_Sharabha.jpg',
    filename: 'munneswaram-kovil-sharabha.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Munneswaram_Narasimha.jpg',
    filename: 'munneswaram-kovil-narasimha.jpg'
  },
  // 6. Seruwawila Mangala Raja Maha Viharaya
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Seruvila_Mangala_Raja_Maha_Viharaya.jpg',
    filename: 'seruwawila-stupa-main.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/76/Seruwawila_temple.jpg',
    filename: 'seruwawila-temple-ruins.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Seruvila_lotus_pooja_3.jpg',
    filename: 'seruwawila-lotus-pooja.jpg'
  },
  // 7. Nilaveli Beach
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Nillaveli_Beach.JPG',
    filename: 'nilaveli-beach-white-sands.jpg'
  },
  {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Blogger_%26_Solobackpacker_Adventurer_tourist_Mr_Rudolph.A.Furtado_at_Nilaveli_beach..jpg',
    filename: 'nilaveli-beach-coastline.jpg'
  }
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function downloadOne(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const parsed = new URL(url);
    const req = https.get({
      hostname: parsed.hostname,
      path: parsed.pathname + parsed.search,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadOne(res.headers.location, dest).then(resolve).catch(reject);
      } else if (res.statusCode === 200) {
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            const sz = fs.statSync(dest).size;
            if (sz === 0) {
              fs.unlinkSync(dest);
              reject(new Error('0 byte file'));
            } else {
              resolve(sz);
            }
          });
        });
      } else {
        file.close();
        if (fs.existsSync(dest)) fs.unlinkSync(dest);
        reject(new Error(`Status ${res.statusCode}`));
      }
    });
    req.on('error', (e) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      reject(e);
    });
  });
}

async function run() {
  const destDir = path.join(__dirname, '../public/images/destinations');
  for (let i = 0; i < downloads.length; i++) {
    const item = downloads[i];
    const target = path.join(destDir, item.filename);
    if (fs.existsSync(target) && fs.statSync(target).size > 1000) {
      console.log(`[${i + 1}/${downloads.length}] Already downloaded ${item.filename}`);
      continue;
    }
    let success = false;
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(`Downloading ${item.filename} (Attempt ${attempt})...`);
        const size = await downloadOne(item.url, target);
        console.log(`✓ Downloaded ${item.filename} (${Math.round(size / 1024)} KB)`);
        success = true;
        break;
      } catch (e) {
        console.error(`Attempt ${attempt} failed for ${item.filename}:`, e.message);
        await sleep(3000 * attempt);
      }
    }
    await sleep(2000);
  }
  console.log('All downloads finished!');
}

run();
