import { useState, useEffect } from "react";

const usePageTitle = title => {
  const [pageTitle, setPageTitle] = useState(`${title} | Dark Matter`);

  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  return [setPageTitle];
};

export default usePageTitle;
