export default function TestPage() {
    return (
        <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
            <h1>✅ Server Çalışıyor!</h1>
            <p>Bağlantı başarılı. Ana sayfa compile hatası var.</p>
            <ul>
                <li>Port: 3000</li>
                <li>Status: OK</li>
                <li>Time: {new Date().toLocaleTimeString('tr-TR')}</li>
            </ul>
        </div>
    );
}
