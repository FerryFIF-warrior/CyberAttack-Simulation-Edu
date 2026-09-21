import '../css/app.css';

/**
 * Perilaku UI murni (dipindahkan dari inline <script> di login.html & register.html).
 * Autentikasi TIDAK lagi ditangani di sini — semua lewat server (Laravel).
 */
document.addEventListener('DOMContentLoaded', () => {
    /* ===== Tutup dropdown/menu (details) saat klik di luar ===== */
    const closeOpenDetails = () => {
        document.querySelectorAll('details[open]').forEach((details) => details.removeAttribute('open'));
    };

    document.addEventListener('click', (event) => {
        document.querySelectorAll('details[open]').forEach((details) => {
            if (!details.contains(event.target)) details.removeAttribute('open');
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeOpenDetails();
    });

    /* ===== Toggle visibility password ===== */
    const bindToggle = (btnId, inputId, iconId) => {
        const btn = document.getElementById(btnId);
        const input = document.getElementById(inputId);
        const icon = document.getElementById(iconId);

        if (!btn || !input || !icon) return;

        btn.addEventListener('click', () => {
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            icon.textContent = isPassword ? 'visibility_off' : 'visibility';
        });
    };

    bindToggle('toggle-pwd-btn', 'passkey-input', 'pwd-icon'); // halaman login
    bindToggle('toggle-password', 'master-key', 'eye-icon'); // halaman register

    /* ===== Indikator format callsign (client-side, min 3 karakter) ===== */
    const callsignInput = document.getElementById('callsign');
    const callsignStatus = document.getElementById('callsign-status');

    if (callsignInput && callsignStatus) {
        const setStatus = (state) => {
            if (state === 'error') {
                callsignStatus.className =
                    'font-code-sm text-code-sm text-error flex items-center gap-1';
                callsignStatus.innerHTML =
                    '<span class="material-symbols-outlined text-[14px]">cancel</span> MIN 3 KARAKTER';
            } else if (state === 'ok') {
                callsignStatus.className =
                    'font-code-sm text-code-sm text-tertiary-fixed-dim flex items-center gap-1';
                callsignStatus.innerHTML =
                    '<span class="material-symbols-outlined text-[14px]">check_circle</span> FORMAT OK';
            } else {
                callsignStatus.className =
                    'font-code-sm text-code-sm text-outline flex items-center gap-1';
                callsignStatus.innerHTML =
                    '<span class="material-symbols-outlined text-[14px]">terminal</span> MENUNGGU INPUT';
            }
        };

        const evaluate = () => {
            const val = callsignInput.value.trim();
            setStatus(val.length === 0 ? 'idle' : val.length < 3 ? 'error' : 'ok');
        };

        evaluate(); // kondisi awal (mis. setelah validasi gagal & old input terisi)
        callsignInput.addEventListener('input', evaluate);
    }

    /* ===== Entropy gauge password (register) ===== */
    const pwd = document.getElementById('master-key');
    const entropyLabel = document.getElementById('entropy-label');
    const bars = document.querySelectorAll('#entropy-bars .entropy-bar');

    if (pwd && entropyLabel && bars.length) {
        const levels = [
            { max: 0, label: 'Kosong', color: 'bg-surface-container-high', active: 0 },
            { max: 5, label: 'Lemah', color: 'bg-error', active: 1 },
            { max: 8, label: 'Cukup', color: 'bg-secondary-container', active: 2 },
            { max: 11, label: 'Baik', color: 'bg-primary-fixed-dim', active: 3 },
            { max: Infinity, label: 'Kuat', color: 'bg-tertiary-container', active: 4 },
        ];

        const render = () => {
            const len = pwd.value.length;
            const level = levels.find((l) => len <= l.max) ?? levels.at(-1);

            entropyLabel.textContent = level.label;
            bars.forEach((bar, i) => {
                bar.className = `entropy-bar h-full rounded-full transition-colors ${
                    i < level.active ? level.color : 'bg-surface-container-high'
                }`;
            });
        };

        pwd.addEventListener('input', render);
        render();
    }
});
