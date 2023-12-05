import React from 'react';

function HowToUse() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-[1100px] bg-gray-700 h-full overflow-y-auto">
      <h1 className="text-2xl font-bold mb-4">How to Use</h1>
      <p className="mb-4">
        This site is a tool designed for Armored Core VI players to plan and construct their mechs while away from the game. This site offers the convenience of instantly viewing potential overloads and provides an intuitive interface for part selection.
      </p>
      <p className="mb-4">
        <strong>Part Selection With Overload Alerts:</strong> As you select parts for your mech, the site will alert you of any potential overloads, ensuring your build is balanced and functional.
      </p>
      <p className="mb-4">
        <strong>Filtering for Easy Search:</strong> Use the filter feature to find the parts you need quickly and efficiently.
      </p>
      <p className="mb-4">
        <strong>Stat Comparisons and Displays:</strong> View your mech's stats in either a simplified or detailed view. While selecting parts, you'll see their individual stats along with a comparison bar, which shows how the part's stats measure against the maximum stats of parts in the same category.
      </p>
      <p className="mb-4">
        Please note that while efforts have been made to gather accurate in-game data for calculations, some stats might not be fully accurate. If you notice any discrepancies, feel free to reach out and let me know.
      </p>
      <p className="mb-4">
        Enjoy your building!
      </p>
    </div>
  );
}

export default HowToUse;