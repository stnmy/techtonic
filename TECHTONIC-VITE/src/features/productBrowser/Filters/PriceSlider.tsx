import { Box, Slider, TextField, Typography } from "@mui/material";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { PriceRangeDto } from "../../../app/models/product";
import { useAppDispatch } from "../../../app/store/store";
import { setPriceRange } from "../productBrowserSlice";
import debounce from "lodash.debounce";

type Props = {
  priceRange: PriceRangeDto;
};

export default function PriceSlider({ priceRange }: Props) {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState<[number, number]>([
    priceRange.minPrice,
    priceRange.maxPrice,
  ]);
  const [input, setInput] = useState<[string, string]>([
    priceRange.minPrice.toString(),
    priceRange.maxPrice.toString(),
  ]);
  const [firstSliderValueChange, setFirstSliderValueChange] = useState(true);

  const lastDispatchedRef = useRef<[number, number] | null>(null);

  const debouncedDispatch = useMemo(
    () =>
      debounce((min: number, max: number) => {
        if (!firstSliderValueChange) {
          const rangeString = `${min}-${max}`;
          dispatch(setPriceRange(rangeString));
          lastDispatchedRef.current = [min, max];
        }
      }, 300),
    [dispatch, firstSliderValueChange]
  );

  // Sync with external priceRange changes
  useEffect(() => {
    setValue([priceRange.minPrice, priceRange.maxPrice]);
    setInput([priceRange.minPrice.toString(), priceRange.maxPrice.toString()]);
    setFirstSliderValueChange(true); // reset to true when new props come in
  }, [priceRange.minPrice, priceRange.maxPrice]);

  useEffect(() => {
    if (value[0] === 0 && value[1] === 0) return;

    const last = lastDispatchedRef.current;
    if (!last || value[0] !== last[0] || value[1] !== last[1]) {
      debouncedDispatch(value[0], value[1]);
    }
  }, [value, debouncedDispatch]);

  const handleSliderChange = useCallback(
    (_: Event, newValue: number[]) => {
      if (Array.isArray(newValue)) {
        if (firstSliderValueChange) setFirstSliderValueChange(false);

        setValue([newValue[0], newValue[1]]);
        setInput([newValue[0].toString(), newValue[1].toString()]);
      }
    },
    [firstSliderValueChange]
  );

  const handleInputChange =
    (index: 0 | 1) => (e: React.ChangeEvent<HTMLInputElement>) => {
      if (firstSliderValueChange) setFirstSliderValueChange(false);

      const newVal = e.target.value;
      setInput((prev) => {
        const copy = [...prev] as [string, string];
        copy[index] = newVal;
        return copy;
      });
    };

  const handleInputKeyDown =
    (index: 0 | 1) => (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleInputBlur(index)();
      }
    };

  const handleInputBlur = (index: 0 | 1) => () => {
    let min = Number(input[0]);
    let max = Number(input[1]);

    if (isNaN(min)) min = priceRange.minPrice;
    if (isNaN(max)) max = priceRange.maxPrice;

    min = Math.max(priceRange.minPrice, Math.min(min, max));
    max = Math.min(priceRange.maxPrice, Math.max(max, min));

    setValue([min, max]);
    setInput([min.toString(), max.toString()]);
  };

  return (
    <Box
      sx={{
        border: "1px solid #acc",
        borderRadius: "4px",
        p: 2,
        width: 320,
        backgroundColor: "#fff",
        marginBottom: 1,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Price Range
      </Typography>
      <Box sx={{ paddingLeft: 1, paddingRight: 1 }}>
        <Slider
          value={value}
          onChange={handleSliderChange}
          min={priceRange.minPrice}
          max={priceRange.maxPrice}
          step={1000}
          valueLabelDisplay="off"
          sx={{
            color: "primary.main",
            "& .MuiSlider-thumb": {
              border: "3px solid white",
              outline: "2px solid black",
            },
          }}
        />
      </Box>

      <Box display="flex" justifyContent="space-between" mt={1}>
        <TextField
          value={input[0]}
          size="small"
          onChange={handleInputChange(0)}
          onBlur={handleInputBlur(0)}
          onKeyDown={handleInputKeyDown(0)}
          inputProps={{
            style: { textAlign: "center" },
            type: "number",
            min: priceRange.minPrice,
            max: value[1],
          }}
        />
        <TextField
          value={input[1]}
          size="small"
          onChange={handleInputChange(1)}
          onBlur={handleInputBlur(1)}
          onKeyDown={handleInputKeyDown(1)}
          inputProps={{
            style: { textAlign: "center" },
            type: "number",
            min: value[0],
            max: priceRange.maxPrice,
          }}
        />
      </Box>
    </Box>
  );
}
