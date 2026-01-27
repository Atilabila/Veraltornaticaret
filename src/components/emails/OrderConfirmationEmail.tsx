
export interface EmailTemplateProps {
    orderNumber: string;
    customerName: string;
    orderDate: string;
    totalAmount: string;
    items: Array<{
        name: string;
        quantity: number;
        price: number;
        image?: string;
    }>;
    shippingAddress: string;
}

export const OrderConfirmationEmail: React.FC<Readonly<EmailTemplateProps>> = ({
    orderNumber,
    customerName,
    orderDate,
    totalAmount,
    items,
    shippingAddress,
}) => {
    // Basic inline styles for email compatibility
    const styles = {
        container: {
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            maxWidth: "600px",
            margin: "0 auto",
            backgroundColor: "#ffffff",
            color: "#1a1a1a",
            lineHeight: "1.5",
        },
        header: {
            backgroundColor: "#000000",
            padding: "30px 0",
            textAlign: "center" as const,
        },
        logo: {
            color: "#D4AF37", // Gold color
            fontSize: "24px",
            fontWeight: "bold",
            textTransform: "uppercase" as const,
            letterSpacing: "0.2em",
            textDecoration: "none",
        },
        content: {
            padding: "40px 20px",
        },
        greeting: {
            fontSize: "18px",
            marginBottom: "20px",
        },
        orderInfoBox: {
            backgroundColor: "#f9f9f9",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "20px",
            marginBottom: "30px",
            textAlign: "center" as const,
        },
        orderNumber: {
            fontSize: "24px",
            fontWeight: "bold",
            color: "#000000",
            margin: "10px 0",
        },
        sectionTitle: {
            fontSize: "16px",
            fontWeight: "bold",
            borderBottom: "1px solid #e5e7eb",
            paddingBottom: "10px",
            marginBottom: "20px",
            textTransform: "uppercase" as const,
            letterSpacing: "0.05em",
        },
        itemRow: {
            display: "flex",
            borderBottom: "1px solid #f3f4f6",
            paddingBottom: "15px",
            marginBottom: "15px",
        },
        itemDetails: {
            flex: 1,
        },
        itemName: {
            fontWeight: "bold",
            display: "block",
            fontSize: "14px",
        },
        itemMeta: {
            fontSize: "12px",
            color: "#6b7280",
        },
        totalRow: {
            borderTop: "2px solid #e5e7eb",
            paddingTop: "20px",
            marginTop: "20px",
            display: "flex",
            justifyContent: "space-between",
            fontSize: "18px",
            fontWeight: "bold",
        },
        footer: {
            backgroundColor: "#f9f9f9",
            padding: "30px 20px",
            textAlign: "center" as const,
            fontSize: "12px",
            color: "#6b7280",
            borderTop: "1px solid #e5e7eb",
        },
        button: {
            display: "inline-block",
            backgroundColor: "#000000",
            color: "#ffffff",
            padding: "12px 24px",
            textDecoration: "none",
            borderRadius: "4px",
            fontWeight: "bold",
            fontSize: "14px",
            marginTop: "20px",
        },
    };

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.header}>
                <a href="https://your-domain.com" style={styles.logo}>
                    VERAL
                </a>
            </div>

            {/* Main Content */}
            <div style={styles.content}>
                <div style={styles.greeting}>
                    Merhaba <strong>{customerName}</strong>,
                </div>
                <p>Siparişiniz başarıyla alındı ve onaylandı. Teşekkür ederiz!</p>

                <div style={styles.orderInfoBox}>
                    <div style={{ fontSize: "12px", color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.1em" }}>Sipariş Numarası</div>
                    <div style={styles.orderNumber}>{orderNumber}</div>
                    <div style={{ fontSize: "14px", color: "#6b7280" }}>{orderDate}</div>
                </div>

                {/* Items */}
                <div style={{ marginBottom: "40px" }}>
                    <h3 style={styles.sectionTitle}>Sipariş Özeti</h3>
                    {items.map((item, index) => (
                        <div key={index} style={{ marginBottom: "15px", borderBottom: index < items.length - 1 ? "1px solid #f3f4f6" : "none", paddingBottom: "15px" }}>
                            <div style={styles.itemName}>{item.name}</div>
                            <div style={styles.itemMeta}>Adet: {item.quantity} | {item.price.toLocaleString('tr-TR')} TL</div>
                        </div>
                    ))}

                    <div style={styles.totalRow}>
                        <span>Toplam Tutar</span>
                        <span>{totalAmount} TL</span>
                    </div>
                </div>

                {/* Shipping */}
                <div style={{ marginBottom: "40px" }}>
                    <h3 style={styles.sectionTitle}>Teslimat Adresi</h3>
                    <p style={{ whiteSpace: "pre-line", color: "#4b5563" }}>
                        {shippingAddress}
                    </p>
                </div>

                <div style={{ textAlign: "center" }}>
                    <a href={`https://metalposter.pro/siparis-sorgula`} style={styles.button}>
                        Siparişimi Takip Et
                    </a>
                </div>
            </div>

            {/* Footer */}
            <div style={styles.footer}>
                <p>&copy; {new Date().getFullYear()} Veral Torna & Teneke Ticaret. Tüm hakları saklıdır.</p>
                <p>Alsancak, İzmir / TÜRKİYE</p>
            </div>
        </div>
    );
};
