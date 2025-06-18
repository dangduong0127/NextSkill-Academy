import Grid from "@mui/material/Grid";
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const footerSections = {
    productInfo: {
      title: "Product Info",
      links: [
        { label: "Features", href: "/features" },
        { label: "Pricing", href: "/pricing" },
        { label: "API Documentation", href: "/docs" },
        { label: "Integrations", href: "/integrations" },
        { label: "Changelog", href: "/changelog" },
      ],
    },
    customerResources: {
      title: "Customer Resources",
      links: [
        { label: "Help Center", href: "/help" },
        { label: "Getting Started", href: "/getting-started" },
        { label: "Tutorials", href: "/tutorials" },
        { label: "Community Forum", href: "/community" },
        { label: "Status Page", href: "/status" },
      ],
    },
    aboutUs: {
      title: "About Us",
      links: [
        { label: "Our Story", href: "/about" },
        { label: "Team", href: "/team" },
        { label: "Careers", href: "/careers" },
        { label: "Press Kit", href: "/press" },
        { label: "Blog", href: "/blog" },
      ],
    },
  };

  const socialLinks = [
    { icon: <Facebook />, href: "https://facebook.com", label: "Facebook" },
    { icon: <Twitter />, href: "https://twitter.com", label: "Twitter" },
    { icon: <LinkedIn />, href: "https://linkedin.com", label: "LinkedIn" },
    { icon: <Instagram />, href: "https://instagram.com", label: "Instagram" },
  ];

  const contactInfo = [
    {
      icon: <Email />,
      text: "support@company.com",
      href: "mailto:support@company.com",
    },
    { icon: <Phone />, text: "+1 (555) 123-4567", href: "tel:+15551234567" },
    {
      icon: <LocationOn />,
      text: "123 Business St, City, State 12345",
      href: "#",
    },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor:
          theme.palette.mode === "dark" ? "grey.900" : "grey.100",
        color: theme.palette.mode === "dark" ? "grey.300" : "grey.700",
        py: 6,
        mt: "auto",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Product Info */}
          <Grid xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {footerSections.productInfo.title}
            </Typography>
            <Box component="nav">
              {footerSections.productInfo.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  color="inherit"
                  underline="hover"
                  display="block"
                  sx={{
                    py: 0.5,
                    fontSize: "0.875rem",
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Customer Resources */}
          <Grid xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {footerSections.customerResources.title}
            </Typography>
            <Box component="nav">
              {footerSections.customerResources.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  color="inherit"
                  underline="hover"
                  display="block"
                  sx={{
                    py: 0.5,
                    fontSize: "0.875rem",
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* About Us */}
          <Grid xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              {footerSections.aboutUs.title}
            </Typography>
            <Box component="nav">
              {footerSections.aboutUs.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  color="inherit"
                  underline="hover"
                  display="block"
                  sx={{
                    py: 0.5,
                    fontSize: "0.875rem",
                    "&:hover": {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {link.label}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Contact + Map */}
          <Grid xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              Contact
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: 2,
                alignItems: "flex-start",
              }}
            >
              {/* Contact Info + Social */}
              <Box sx={{ flex: 1 }}>
                {contactInfo.map((contact, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1.5,
                    }}
                  >
                    <Box
                      sx={{
                        mr: 1,
                        color: theme.palette.primary.main,
                        minWidth: 20,
                      }}
                    >
                      {contact.icon}
                    </Box>
                    <Link
                      href={contact.href}
                      color="inherit"
                      underline="hover"
                      sx={{
                        fontSize: "0.875rem",
                        "&:hover": {
                          color: theme.palette.primary.main,
                        },
                      }}
                    >
                      {contact.text}
                    </Link>
                  </Box>
                ))}

                <Box sx={{ mt: 3 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Follow Us
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    {socialLinks.map((social) => (
                      <IconButton
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        size="small"
                        sx={{
                          color: "inherit",
                          "&:hover": {
                            color: theme.palette.primary.main,
                            backgroundColor: theme.palette.action.hover,
                          },
                        }}
                        aria-label={social.label}
                      >
                        {social.icon}
                      </IconButton>
                    ))}
                  </Box>
                </Box>
              </Box>

              {/* Map */}
              <Box
                sx={{
                  flex: 1,
                  minWidth: 150,
                  height: 150,
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.9442994564824!2d105.85932737613707!3d20.99486978064602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ad11b1f441bf%3A0xcf480c26f8137a3a!2sVTC%20Online%20Building!5e0!3m2!1svi!2s!4v1749876254072!5m2!1svi!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 4, borderColor: "grey.400" }} />

        {/* Bottom Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.mode === "dark" ? "grey.400" : "grey.600",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            © {new Date().getFullYear()} Your Company Name. All rights
            reserved.
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 3,
              flexWrap: "wrap",
              justifyContent: isMobile ? "center" : "flex-end",
            }}
          >
            <Link
              href="/privacy"
              underline="hover"
              color="inherit"
              sx={{ fontSize: "0.875rem" }}
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              underline="hover"
              color="inherit"
              sx={{ fontSize: "0.875rem" }}
            >
              Terms of Service
            </Link>
            <Link
              href="/cookies"
              underline="hover"
              color="inherit"
              sx={{ fontSize: "0.875rem" }}
            >
              Cookie Policy
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
