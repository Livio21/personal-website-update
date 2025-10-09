# Vibration Patterns Guide

Your vibration hook has been integrated across multiple interactive elements in your app. Here's how it works:

## Hook Usage

```tsx
import { useVibration } from "@/hooks/use-vibration";

function MyComponent() {
  const vibrate = useVibration();
  
  const handleClick = () => {
    vibrate(50); // Single vibration for 50ms
    // or
    vibrate([100, 50, 100]); // Pattern: vibrate 100ms, pause 50ms, vibrate 100ms
  };
}
```

## Current Integrations

### Mobile Navigation (`mobile-nav.tsx`)
- **Drag over items**: `vibrate(50)` - Light feedback when hovering over nav items
- **Selection**: `vibrate([50, 30])` - Double pulse when selecting an item

### Desktop Navigation (`site-header.tsx`)
- **All links**: `vibrate(35)` - Light tap feedback on navigation clicks

### Buttons
- **Regular Button**: `vibrate(40)` - Standard button press feedback
- **ShinyButton**: `vibrate(40)` - Same as regular buttons
- **Carousel controls**: `vibrate(30)` - Lighter feedback for navigation

### Switch Component
- **Turn ON**: `vibrate([30, 20])` - Double pulse for activation
- **Turn OFF**: `vibrate(25)` - Single pulse for deactivation

## Vibration Pattern Examples

```tsx
// Light tap (good for small interactions)
vibrate(25);

// Standard button press
vibrate(40);

// Hover/selection feedback
vibrate(50);

// Success/confirmation (double pulse)
vibrate([50, 30]);

// Error/warning (triple pulse)
vibrate([100, 50, 100, 50, 100]);

// Notification (long then short)
vibrate([200, 100, 50]);
```

## Browser Support

The vibration API works on:
- Mobile browsers (iOS Safari, Chrome Mobile, Firefox Mobile)
- Some desktop browsers with gamepad support
- Gracefully fails on unsupported devices (no errors)

## Best Practices

1. **Keep it subtle** - Use short durations (25-50ms) for most interactions
2. **Different patterns for different actions** - Help users distinguish between actions
3. **Don't overuse** - Only add to meaningful interactions
4. **Test on devices** - Vibration feels different on different devices

## Adding to New Components

To add vibration to any new interactive element:

```tsx
import { useVibration } from "@/hooks/use-vibration";

function MyInteractiveComponent() {
  const vibrate = useVibration();
  
  return (
    <button onClick={() => vibrate(40)}>
      Click me!
    </button>
  );
}
```