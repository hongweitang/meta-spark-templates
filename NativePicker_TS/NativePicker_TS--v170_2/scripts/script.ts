// How to load in modules
import Reactive from 'Reactive';
import Diagnostics from 'Diagnostics';
import Scene from 'Scene';
import Materials from 'Materials';
import NativeUI from 'NativeUI';
import Patches from 'Patches';
import Textures from 'Textures';

/**
 * Info for Picker textures:
 *
 * Remember to turn OFF compression on the picker textures
 * else you will get the following error message:
 *
 * - Invalid texture: Only uncompressed textures are supported
 *   by Native UI. Please disable compression for them."
 */

(async function () {
  // To set signal properties, use Reactive.val for primitives.

  const [pickerMat, tex0, tex1, tex2] = await Promise.all([
    Materials.findFirst('pickerMat') as Promise<MaterialBase>,
    Textures.findFirst('picker-icon-00') as Promise<ImageTexture>,
    Textures.findFirst('picker-icon-01') as Promise<ImageTexture>,
    Textures.findFirst('picker-icon-02') as Promise<ImageTexture>,
  ]);

  const picker = NativeUI.picker;
  const pickerConfig = {
    selectedIndex: 0,
    items: [
      {
        image_texture: tex0,
      },
      {
        image_texture: tex1,
      },
      {
        image_texture: tex2,
      },
    ],
  };
  picker.configure(pickerConfig);
  picker.visible = Reactive.val(true);

  pickerMat.diffuse = pickerConfig.items[0].image_texture;

  picker.selectedIndex.monitor().subscribe(function (index) {
    Patches.inputs.setScalar('setMarker', index.newValue);

    pickerMat.diffuse = pickerConfig.items[index.newValue].image_texture;
  });
})();
