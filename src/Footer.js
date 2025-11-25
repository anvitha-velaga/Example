const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer
      className="footer"
      style={{
        width: "100%",
        textAlign: "center",
        padding: "10px 0",
        backgroundColor: "#ffffff",   // white footer
        color: "#1e3a8a",             // deep professional blue
        fontSize: "14px",
        position: "fixed",
        bottom: 0,
        left: 0,
        borderTop: "1px solid #d1d9f0", // soft blue border
      }}
    >
      &copy; {year} RATE RIGHT. All rights reserved.
    </footer>
  );
};

export default Footer;

