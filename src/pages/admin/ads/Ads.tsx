import ReadAdvertisement from "../../../adminComponents/advertisement/ReadAtvertisement";
import Button from "../../../utility/button/Button";

export default function Ads() {
  return (
    <div className="flex flex-col gap-4 px-6 py-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Reklamalar</h1>
        <Button
          className="mt-0 flex items-center gap-2 px-5"
          path="/admin/ads/add"
        >
          Reklama Qo'shish
        </Button>
      </div>
      <ReadAdvertisement />
    </div>
  );
}
