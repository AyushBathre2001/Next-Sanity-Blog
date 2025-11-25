import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import { notFound } from "next/navigation";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { urlForImage } from "@/lib/sanity/image";
import { parseISO, format } from "date-fns";

import CategoryLabel from "@/components/blog/category";
import AuthorCard from "@/components/blog/authorCard";
import TableOfContents from "@/components/blog/tableOfContents";
import Faqs from "@/components/blog/Faqs";
import RelatedArticles from "@/components/blog/RelatedArticles";
import NewsletterForm from "@/components/blog/NewsletterForm";
import SteelMasterForm from "@/components/form/SteelMasterForm";

export default function Post(props) {
  const { loading, post } = props;

  const slug = post?.slug;

  if (!loading && !slug) {
    notFound();
  }

  const imageProps = post?.image ? urlForImage(post?.image) : null;
  const AuthorimageProps = post?.author?.image
    ? urlForImage(post.author.image)
    : null;

  // Extract headings from the body content
  const extractHeadings = body => {
    if (!body) return [];

    const headings = [];

    const traverseBlocks = blocks => {
      blocks.forEach(block => {
        if (
          block._type === "block" &&
          block.style === "h2" &&
          block.children
        ) {
          const text = block.children
            .map(child => child.text)
            .join("");
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
          headings.push({ id, text });
        }

        // Handle nested blocks in portable text
        if (block.children) {
          traverseBlocks(block.children);
        }
        if (block.items) {
          traverseBlocks(block.items);
        }
      });
    };

    traverseBlocks(body);
    return headings;
  };

  const headings = extractHeadings(post?.body);

  return (
    <>
      <Container className="max-w-screen-xl !pt-0">
        <div className="mx-auto max-w-screen-md">
          <div className="flex justify-center">
            <CategoryLabel categories={post.categories} />
          </div>
          <h1 className="font-bebas_neue mb-3 mt-2 text-center text-3xl font-normal leading-tight tracking-wide dark:text-white lg:text-4xl lg:leading-snug">
            {post.title}
          </h1>

          <div className="mt-3 flex justify-center space-x-3 text-gray-500 ">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 flex-shrink-0">
                {AuthorimageProps && (
                  <Image
                    src={AuthorimageProps.src}
                    alt={post?.author?.name}
                    className="rounded-full object-cover"
                    fill
                    sizes="40px"
                  />
                )}
              </div>
              <div>
                <p className="text-gray-800 dark:text-gray-400">
                  {post.author.name}
                </p>
                <div className="flex items-center space-x-2 text-sm">
                  <time
                    className="text-gray-500 dark:text-gray-400"
                    dateTime={post?.publishedAt || post._createdAt}>
                    {format(
                      parseISO(post?.publishedAt || post._createdAt),
                      "MMMM dd, yyyy"
                    )}
                  </time>
                  <span>· {post.estReadingTime || "5"} min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <div className="relative z-0 mx-auto aspect-video max-w-screen-xl overflow-hidden lg:rounded-lg">
        {imageProps && (
          <Image
            src={imageProps.src}
            alt={post.mainImage?.alt || "Thumbnail"}
            loading="eager"
            fill
            sizes="100vw"
            className="object-cover"
          />
        )}
      </div>

      <Container className="max-w-screen-xl">
        <div className="mx-auto max-w-screen-2xl">
          <div className="flex w-full flex-col gap-8 lg:flex-row">
            {/* Table of Contents - Left Sidebar */}
            {headings.length > 0 && (
              <aside className="w-full flex-shrink-0 lg:block lg:w-60">
                <TableOfContents headings={headings} />
              </aside>
            )}

            {/* Article Content */}
            <article
              className={`${headings.length > 0 ? "lg:flex-1" : "mx-auto max-w-screen-md"}`}>
              <div className="prose mx-auto my-3 dark:prose-invert prose-a:text-blue-600">
                {post.body && (
                  <PortableTextWithIds value={post.body} />
                )}
              </div>
              {post?.faqs && <Faqs faqs={post?.faqs} />}

              {post.author && <AuthorCard author={post.author} />}
            </article>

            <aside className="sticky top-6 h-full w-full flex-shrink-0 lg:block lg:w-[350px]">
              <SteelMasterForm />
            </aside>
          </div>
        </div>
        <div className="w-full py-10 md:py-14">
          <RelatedArticles posts={post?.relatedArticles} />
        </div>
      </Container>
    </>
  );
}

// Custom PortableText component that adds IDs to headings
function PortableTextWithIds({ value }) {
  const components = {
    block: {
      h2: ({ children }) => {
        const text = Array.isArray(children)
          ? children
              .map(child => (typeof child === "string" ? child : ""))
              .join("")
          : String(children);
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
        return <h2 id={id}>{children}</h2>;
      }
    },
    types: {
      image: ({ value }) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <figure className="my-8">
            <Image
              {...urlForImage(value)}
              alt={value.alt || "Blog image"}
              width={800}
              height={600}
              className="rounded-lg"
            />
            {value.caption && (
              <figcaption className="mt-2 text-center text-sm italic text-gray-600 dark:text-gray-400">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
      video: ({ value }) => {
        if (!value?.url) {
          return null;
        }

        // Check if it's a YouTube or Vimeo URL
        const isYouTube =
          value.url.includes("youtube.com") ||
          value.url.includes("youtu.be");
        const isVimeo = value.url.includes("vimeo.com");

        let embedUrl = value.url;

        if (isYouTube) {
          const videoId = value.url.match(
            /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
          )?.[1];
          embedUrl = `https://www.youtube.com/embed/${videoId}`;
        } else if (isVimeo) {
          const videoId = value.url.match(/vimeo\.com\/(\d+)/)?.[1];
          embedUrl = `https://player.vimeo.com/video/${videoId}`;
        }

        return (
          <figure className="my-8">
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <iframe
                src={embedUrl}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            {value.caption && (
              <figcaption className="mt-2 text-center text-sm italic text-gray-600 dark:text-gray-400">
                {value.caption}
              </figcaption>
            )}
          </figure>
        );
      },
      codeBlock: ({ value }) => {
        if (!value?.code) {
          return null;
        }
        return (
          <div className="my-6">
            {value.filename && (
              <div className="rounded-t-lg bg-gray-800 px-4 py-2 text-sm text-gray-300">
                {value.filename}
              </div>
            )}
            <pre
              className={`${value.filename ? "rounded-t-none" : ""} overflow-x-auto rounded-lg bg-gray-900 p-4`}>
              <code
                className={`language-${value.language || "text"} text-sm text-gray-100`}>
                {value.code}
              </code>
            </pre>
          </div>
        );
      }
    }
  };

  return <PortableText value={value} components={components} />;
}

const MainImage = ({ image }) => {
  return (
    <div className="mb-12 mt-12 ">
      <Image {...urlForImage(image)} alt={image.alt || "Thumbnail"} />
      <figcaption className="text-center ">
        {image.caption && (
          <span className="text-sm italic text-gray-600 dark:text-gray-400">
            {image.caption}
          </span>
        )}
      </figcaption>
    </div>
  );
};
