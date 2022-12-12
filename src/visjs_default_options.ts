export const options = {
  height: "100%",
  layout: {
    hierarchical: {
      // enabled: true
      // direction: 'UD',
      direction: "LR",
      // sortMethod: 'directed',
      treeSpacing: 185,
      levelSeparation: 95,
      nodeSpacing: 40,
    },
  },
  nodes: {
    size: 10,
  },
  edges: {
    arrows: {
      to: {
        enabled: true,
        scaleFactor: 0.5,
      },
    },
    // edge label is not displayed at the center of the edge
    // if `smooth` is specified
    smooth: {
      enabled: true,
      // type: 'dynamic',
      type: "vertical", // This is better for LR
      // type: 'horizontal', // This is better for UD
      // type: 'continuous',
      // type: 'curvedCCW',
      // type: 'straightCross',
      roundness: 1.0,
    },
  },
  interaction: {
    hover: true,
    navigationButtons: true,
  },
  physics: false,
};
