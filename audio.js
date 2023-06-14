  // async function createAudio(sound) {
  //   const buffer = Buffer.from(sound, 'base64').buffer;
  //   const context = new AudioContext();
  //   context.resume();
  //   const source = context.createBufferSource();

  //   source.buffer = await context.decodeAudioData(buffer, (data) => {
  //     console.log('WORKING ', data);
  //   }, (err) => {
  //     console.log('NOT WOKRING ', err);
  //   });
  //   source.loop = false;
  //   return { source, context, buffer };
  // }


    // console.log({ sound });
    // const track = await createAudio(sound);
    // const { source, context } = track;
    // source.connect(context.destination);

    // source.start(0);
    // source.onended = function () {
    //   source.disconnect(context.destination);
    // };
  