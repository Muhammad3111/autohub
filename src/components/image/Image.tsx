const IMAGE_URL = import.meta.env.VITE_S3_PUBLIC_URL;

type ImageProps = {
    src: string;
    alt: string;
    className?: string;
    width?: number;
    height?: number;
    loading?: "eager" | "lazy" | undefined;
};

const Image = ({ src, alt, className, width, height, loading }: ImageProps) => {
    return (
        <img
            src={`${IMAGE_URL}${src}`}
            alt={alt}
            className={className}
            width={width}
            height={height}
            loading={loading}
        />
    );
};
export default Image;
