import { Helmet } from "react-helmet-async";

function SEO({
  title,
  description,
  keywords,
  image = "/images/og-image.jpg",
  url,
}) {
  const siteTitle = "CLB Tin học THCS Hải Thành";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;
  const defaultDescription =
    "CLB Tin học THCS Hải Thành - Nơi ươm mầm đam mê công nghệ, phát triển tư duy sáng tạo và kỹ năng lập trình cho thế hệ trẻ.";
  const defaultKeywords =
    "CLB Tin học, lập trình, Scratch, Python, THCS Hải Thành, học lập trình, tin học phổ thông";

  return (
    <Helmet>
      {/* Basic */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta
        property="og:description"
        content={description || defaultDescription}
      />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url || window.location.href} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta
        name="twitter:description"
        content={description || defaultDescription}
      />
      <meta name="twitter:image" content={image} />

      {/* Canonical */}
      <link rel="canonical" href={url || window.location.href} />
    </Helmet>
  );
}

export default SEO;
