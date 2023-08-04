import { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFeather } from "@fortawesome/free-solid-svg-icons";

const seoFacts: string[] = [
  "Repurposing content can increase organic traffic by 106%. (Hubspot) - We can help.",
  "50% of search queries contain 4 or more words. (Search South)",
  "25% of small business websites don’t have an H1 tag. (FreshChalk) - We always use one!",
  "Leads resulting from seo have a 14.6% average conversion rate. (Monster Insights) - We can help.",
  "Search engines drive 10x more traffic to ecommerce sites than social media. (Search Engine Land)",
  "75% of users don’t even scroll past the first page of the SERPs. (HubSpot)",
  "21% of users access more than one of the search results. (SMA Marketing)",
  "62% of Millennial and Gen Z consumers want visual search. (Businesswire)",
  "Google holds over 85.5% of the search engine market share. (Statista)",
  "Sites that make the first page on Google have an average of 1,447 words. (ThriveMyWay)- We can help.",
  "Organic Google results with 3-4 words in the title drive higher CTR. (Smart Insights)- We can help.",
  "Search queries of the “__ to avoid” format have increased by 150%. (Wordstream)",
  "92.96% of global traffic comes from Google Search, Google Images, and Google Maps. (SparkToro)",
  "60% of marketers say that inbound (SEO, blog content, etc.) is their highest quality source of leads. (HubSpot)- We can help.",
  "Only 5.7% of pages will rank in the top 10 search results within a year of publication. (Ahrefs)",
  "7.4% of top-ranking pages don’t have a title tag. (Ahrefs) - We always provide one.",
  "25.02% of top-ranking pages don’t have meta descriptions. (Ahrefs) - We always provide one.",
  "40.61% of pages have meta descriptions that truncate. (Ahrefs) - We don't truncate anything but your costs.",
  "The average page in the top 10 is 2+ years old. (Ahrefs)",
  "Generally speaking, the more backlinks a page has, the more organic traffic it gets from Google. (Ahrefs)",
  "The average cost of publishing a paid guest post is $77.80. (Ahrefs)",
  "73.6% of domains have reciprocal links. (Ahrefs)",
];

const Loading: () => JSX.Element = () => {
  const [seoFact, setSeoFact] = useState<string>(
    "Working hard on it! It might take up to a minute. Or two."
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeoFact(seoFacts[Math.floor(Math.random() * seoFacts.length)]);
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="text-slate flex h-full animate-pulse w-full flex-col justify-center items-center">
      <FontAwesomeIcon
        icon={faFeather}
        size="4x"
        className="px-2 text-slate-900/60 h-5"
      ></FontAwesomeIcon>
      <h5 className="w-[60%] text-center">{seoFact}</h5>
    </div>
  );
};

export default Loading;
