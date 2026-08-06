// Thin wrapper pages binding each CollectionConfig to the generic
// ManageCollection CRUD screen — keeps route definitions in App.tsx concise.
import ManageCollection from "./ManageCollection";
import {
  officersConfig,
  achievementsConfig,
  productionsConfig,
  eventsConfig,
  galleryConfig,
  mediaConfig,
  testimonialsConfig,
} from "./adminConfig";

export const ManageOfficersPage = () => <ManageCollection config={officersConfig} />;
export const ManageAchievementsPage = () => <ManageCollection config={achievementsConfig} />;
export const ManageProductionsPage = () => <ManageCollection config={productionsConfig} />;
export const ManageEventsPage = () => <ManageCollection config={eventsConfig} />;
export const ManageGalleryPage = () => <ManageCollection config={galleryConfig} />;
export const ManageMediaPage = () => <ManageCollection config={mediaConfig} />;
export const ManageTestimonialsPage = () => <ManageCollection config={testimonialsConfig} />;
