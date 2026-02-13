import type { ReactNode } from "react";
import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: ReactNode;
};

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <p>
          SVGMap is an open approach to building rich, user-driven web maps –
          free from centralized control.
        </p>
        <p>
          As a de-centralized, client-centric, and hyper-document-based web
          mapping standard, it offers open source front-end (webApps) and
          back-end implementations based on <a href="https://w3.org/svg">SVG</a>
          . In particular, it has the good{" "}
          <a href="https://satakagi.github.io/mapsForWebWS2020-docs/De-centralizedWebMapping.html">
            ability to integrate various map contents on the web through
            client-side inter-operability
          </a>{" "}
          and the{" "}
          <a href="https://satakagi.github.io/mapsForWebWS2020-docs/QuadTreeCompositeTilingAndVectorTileStandard.html">
            ability to visualize big data
          </a>{" "}
          on a map.
        </p>
        <p>
          There are already implementations of SVGMap with over 15 years of
          practical experience for enterprise. And, as of 2025, continuous
          improvement is ongoing.
        </p>
      </div>
    </section>
  );
}
