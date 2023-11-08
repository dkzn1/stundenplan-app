export default function getScreenSizeRatio(height, width) {
  //
  const isPortraitRatio = height / width > 1.15 || width < 1180
  const isMobileRatio = height / width > 1.5 || width < 864

  return { isPortraitRatio, isMobileRatio }
}
