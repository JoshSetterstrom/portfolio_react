function hexToRgb(hex) {
    const cleanHex = hex.replace(/^#/, '');
    return {
      r: parseInt(cleanHex.slice(0, 2), 16),
      g: parseInt(cleanHex.slice(2, 4), 16),
      b: parseInt(cleanHex.slice(4, 6), 16)
    };
  }
  
  function rgbToHex(r, g, b) {
    const clamp = (val) => Math.max(0, Math.min(255, Math.round(val)));
    const rh = clamp(r).toString(16).padStart(2, '0');
    const gh = clamp(g).toString(16).padStart(2, '0');
    const bh = clamp(b).toString(16).padStart(2, '0');
    return `#${rh}${gh}${bh}`;
  }
  
  /**
   * Calculate the overlay color needed given a background, desired final color, and opacity:
   * Overlay = (Final - Background*(1 - Alpha)) / Alpha
   *
   * If the result is invalid (requires out-of-range RGB), return null.
   */
  function calculateOverlay(background, desired, alpha) {
    const bg = hexToRgb(background);
    const final = hexToRgb(desired);
    const invAlpha = 1 - alpha;
  
    const overlayR = (final.r - bg.r * invAlpha) / alpha;
    const overlayG = (final.g - bg.g * invAlpha) / alpha;
    const overlayB = (final.b - bg.b * invAlpha) / alpha;

    console.log(overlayR, overlayG, overlayB)
  
    // Check if valid
    if (overlayR < 0 || overlayR > 255 || overlayG < 0 || overlayG > 255 || overlayB < 0 || overlayB > 255) {
      return null;
    }
  
    return rgbToHex(overlayR, overlayG, overlayB);
  }
  
  /**
   * Calculate the background given a final color, overlay color, and alpha:
   * Background = (Final - Overlay*Alpha) / (1 - Alpha)
   */
  function calculateBackground(finalColor, overlay, alpha) {
    const f = hexToRgb(finalColor);
    const o = hexToRgb(overlay);
    const invAlpha = 1 - alpha;
  
    const bgR = (f.r - o.r * alpha) / invAlpha;
    const bgG = (f.g - o.g * alpha) / invAlpha;
    const bgB = (f.b - o.b * alpha) / invAlpha;
  
    return rgbToHex(bgR, bgG, bgB);
  }
  
  /**
   * Attempt to get an overlay color for given background, desiredColor, and opacity.
   * If not possible, show an explanatory message and demonstrate the #676776 scenario.
   *
   * @param {string} backgroundColor - e.g. "#fff"
   * @param {string} desiredColor - e.g. "#171726"
   * @param {number} opacity - e.g. 0.9
   * @returns {string} - The overlay hex or an explanatory message if impossible.
   */
  function calculateOpacityColor(backgroundColor, desiredColor, opacity) {
    const overlay = calculateOverlay(backgroundColor, desiredColor, opacity);
    if (overlay) {
      return `Overlay color: ${overlay}`;
    }
  
    // If we reach here, no valid overlay was found.
    let message = `No valid overlay can achieve ${desiredColor} at opacity ${opacity} over ${backgroundColor}.`;
  
    // Demonstration of why #676776 is significant:
    // Given final=#1f1f2e, overlay=#171726, alpha=0.9, find the background:
    const exampleFinal = "#1f1f2e";
    const exampleOverlay = "#171726";
    const exampleAlpha = 0.9;
    const derivedBackground = calculateBackground(exampleFinal, exampleOverlay, exampleAlpha);
  
    // Now given that derived background, we can solve for overlay that produces #171726:
    const secondOverlay = calculateOverlay(derivedBackground, "#171726", exampleAlpha);
  
    message += `\nFor example, from final=${exampleFinal}, overlay=${exampleOverlay}, and alpha=${exampleAlpha}, we got background=${derivedBackground} (which is #676776).`;
    message += `\nThen, using background=${derivedBackground}, desired=#171726, and alpha=${exampleAlpha}, the overlay is ${secondOverlay} (which is #0e0e1d).`;
  
    message += `\nThis shows how #676776 was important in the equation to achieve #0e0e1d for the desired final scenario.`;
  
    return message;
  }

export default calculateOpacityColor
  
  // Example Usage:
  // If possible, it will show the overlay color. If not, it will show the reasoning with #676776.
  