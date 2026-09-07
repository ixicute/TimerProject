export default function FullscreenButton() {
  async function handleFullscreen() {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      return;
    }

    await document.exitFullscreen();
  }

  return (
    <button type="button" onClick={handleFullscreen}>
      Fullscreen
    </button>
  );
}