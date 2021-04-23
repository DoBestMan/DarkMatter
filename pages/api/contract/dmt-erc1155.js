export default (req, res) => {
  res.statusCode = 200;
  res.json({
    name: "Dark Matter Ltd.",
    description: "Dark Matter presents: Mission to Marp. Users will navigate their way through a narrative-driven augmented reality game utilizing DeFi yield farming and collectible NFT's. Dark Matter is the next evolution in yield farming protocols.",
    image: "https://darkmatter.finance/logo.png",
    external_link: "https://darkmatter.finance",
  });
};
