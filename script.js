let title = document.querySelector('.title');
let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek-slider');
let volume_slider = document.querySelector('.volume-slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');


let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;
let bgTimer;

const music_list = [
    {
        img : 'poster/ATBE.jpg',
        name : 'Âm Thầm Bên Em',
        artist : 'Sơn Tùng M-TP',
        music : 'music/AmThamBenEm-SonTungMTP-4066476.mp3'
    },
    {
        img : 'poster/BYND.jpg',
        name : 'Bình Yên Nơi Đâu',
        artist : 'Sơn Tùng M-TP',
        music : 'music/BinhYenNoiDau-M-TP_452gz.mp3'
    },
    {
        img : 'poster/CADSV.jpg',
        name : 'Chắc Ai Đó Sẽ Về',
        artist : 'Sơn Tùng M-TP',
        music : 'music/ChacAiDoSeVeNewVersion-SonTungMTP-3698905.mp3'
    },
    {
        img : 'poster/CTKTVN.jpg',
        name : 'Chúng Ta Không Thuộc Về Nhau',
        artist : 'Sơn Tùng M-TP',
        music : 'music/ChungTaKhongThuocVeNhau-SonTungMTP-4528181.mp3'
    },
    {
        img : 'poster/CMXD.jpg',
        name : 'Cơn Mưa Xa Dần',
        artist : 'Sơn Tùng M-TP',
        music : 'music/ConMuaXaDan-SonTungMTP-8033250.mp3'
    },
    {
        img : 'poster/DVT.jpg',
        name : 'Đừng Về Trễ',
        artist : 'Sơn Tùng M-TP',
        music : 'music/DungVeTreRnbVersion-MTP-2691584.mp3'
    },
    {
        img : 'poster/HTCA.jpg',
        name : 'Hãy Trao Cho Anh',
        artist : 'Sơn Tùng M-TP',
        music : 'music/HayTraoChoAnh-SonTungMTPSnoopDogg-6010660.mp3'
    },
    {
        img : 'poster/LT.jpg',
        name : 'Lạc Trôi',
        artist : 'Sơn Tùng M-TP',
        music : 'music/LacTroiTripleDRemix-SonTungMTP-5164670.mp3'
    },
    {
        img : 'poster/MNMBA.jpg',
        name : 'Một Năm Mới Bình An',
        artist : 'Sơn Tùng M-TP',
        music : 'music/MotNamMoiBinhAn-SonTungMTP-4315569.mp3'
    },
    {
        img : 'poster/MRMSC.png',
        name : 'Muộn Rồi Mà Sao Còn',
        artist : 'Sơn Tùng M-TP',
        music : 'music/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3'
    },
    {
        img : 'poster/NANQ.jpg',
        name : 'Nắng Ấm Ngang Qua',
        artist : 'Sơn Tùng M-TP',
        music : 'music/NangAmNgangQua-SonTungMTP-8033251.mp3'
    },
    {
        img : 'poster/NNHQ.jpg',
        name : 'Như Ngày Hôm Qua',
        artist : 'Sơn Tùng M-TP',
        music : 'music/NhuNgayHomQuaUpgrade-SonTungMTP-4282962.mp3'
    },
    {
        img : 'poster/NNCA.jpg',
        name : 'Nơi Này Có Anh',
        artist : 'Sơn Tùng M-TP',
        music : 'music/NoiNayCoAnh-SonTungMTP-4772041.mp3'
    },
    {
        img : 'poster/TLVNO.jpg',
        name : 'Tiến Lên Việt Nam Ơi',
        artist : 'Sơn Tùng M-TP',
        music : 'music/TienLenVietNamOi-SonTungMTP-4003040.mp3'
    },
    {
        img : 'poster/YOYTD.jpg',
        name : 'You Of Yesterday',
        artist : 'Sơn Tùng M-TP',
        music : 'music/YouOfYesterday-SonTungMTP-5524481.mp3'
    }
];

// Load random gradient background color
function load_bg(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    // Function to create random hex_color
    function random_color(hex_code){
        for (let i = 0; i < 6; i++){
            let index = Math.round(Math.random() * 14);
            let hex_char = hex[index];
            hex_code += hex_char;
        }
        return hex_code;
    }
    let first_color = random_color("#");
    let second_color = random_color("#");
    var angle = 'to right';
    let gradient = 'linear-gradient('+ angle + ',' + first_color + ',' + second_color +')';
    document.body.style.background = gradient;
}

// Function to load a song

function load_track(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url("+ music_list[track_index].img+")";
    track_name.textContent = music_list[track_index].name;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    // Update time
    updateTimer = setInterval(setUpdate, 1000);
    curr_track.addEventListener('ended', nextTrack);
    bgTimer = setInterval(load_bg, 1000);
    clearInterval(bgTimer);
    bgTimer = setInterval(load_bg, 60000);
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}


// Function to change time and volume

function seekto(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.duration = seekto;
}

function set_volume(){
    curr_track.volume = volume_slider.value / 100;
}