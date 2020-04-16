// 1. Go to https://twitter.com/YOUR_USER_NAME/following
// 2. Open the Developer Console. (COMMAND+ALT+I on Mac)
// 3. Paste this into the Developer Console and run it
(() => {
  const followButtonQuery = '[data-testid$="-unfollow"]';
  const confirmButtonQuery = '[data-testid="confirmationSheetConfirm"]';
  const sleep = ({ seconds }) =>
    new Promise(proceed => {
      console.log(`WAITING FOR ${seconds} SECONDS...`);
      setTimeout(proceed, seconds * 1000);
    });

  const nextBatch = async () => {
    window.scrollTo(0, document.body.scrollHeight);
    await sleep({ seconds: 1 });

    const followButtons = Array.from(document.querySelectorAll(followButtonQuery));
    const followButtonCount = followButtons.length;

    if (followButtonCount === 0) {
      console.log(`NO ACCOUNTS FOUND, SO I THINK WE'RE DONE`);
      console.log(`RELOAD PAGE AND RE-RUN SCRIPT IF ANY WERE MISSED`);
      return;
    }

    console.log(`UNFOLLOWING ${followButtonCount} USERS...`);

    await Promise.all(
      followButtons.map(async followButton => {
        followButton.click();
        await sleep({ seconds: 1 });
        const confirmButton = document.querySelector(confirmButtonQuery);
        confirmButton.click();
      })
    );

    await sleep({ seconds: 2 });
    nextBatch();
  };

  nextBatch();
})();
