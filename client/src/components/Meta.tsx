import { Helmet } from "react-helmet";

interface IMeta {
  title: string | undefined;
}

const Meta = (props: IMeta) => {
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{props.title}</title>
    </Helmet>
  );
};

export default Meta;
