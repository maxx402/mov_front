"use client";

import { TagPill } from "@/components/common/tag-pill";
import type { Category } from "@/domain/entities/category";
import type { Genre } from "@/domain/entities/genre";
import { MovieSortType } from "@/domain/entities/movie-filters";

interface Props {
  categories: readonly Category[];
  areas: readonly string[];
  years: readonly number[];
  genres: readonly Genre[];
  selectedCategoryId: string;
  selectedArea: string;
  selectedYear: string;
  selectedGenreId: string;
  selectedSort: MovieSortType;
  onCategoryChange: (id: string) => void;
  onAreaChange: (area: string) => void;
  onYearChange: (year: string) => void;
  onGenreChange: (id: string) => void;
  onSortChange: (sort: MovieSortType) => void;
}

export function FilterBar({
  categories,
  areas,
  years,
  genres,
  selectedCategoryId,
  selectedArea,
  selectedYear,
  selectedGenreId,
  selectedSort,
  onCategoryChange,
  onAreaChange,
  onYearChange,
  onGenreChange,
  onSortChange,
}: Props) {
  const sortOptions = [
    { value: MovieSortType.Latest, label: "最新" },
    { value: MovieSortType.Popular, label: "最热" },
    { value: MovieSortType.Score, label: "评分" },
  ];

  return (
    <div className="flex flex-col" style={{ gap: 10 }}>
      {/* Categories */}
      {categories.length > 0 && (
        <FilterRow>
          <TagPill label="全部" active={selectedCategoryId === ""} onClick={() => onCategoryChange("")} />
          {categories.map((cat) => (
            <TagPill key={cat.id} label={cat.name} active={selectedCategoryId === cat.id} onClick={() => onCategoryChange(cat.id)} />
          ))}
        </FilterRow>
      )}

      {/* Areas */}
      {areas.length > 0 && (
        <FilterRow>
          <TagPill label="全部" active={selectedArea === ""} onClick={() => onAreaChange("")} />
          {areas.map((area) => (
            <TagPill key={area} label={area} active={selectedArea === area} onClick={() => onAreaChange(area)} />
          ))}
        </FilterRow>
      )}

      {/* Years */}
      {years.length > 0 && (
        <FilterRow>
          <TagPill label="全部" active={selectedYear === ""} onClick={() => onYearChange("")} />
          {years.map((year) => (
            <TagPill key={year} label={String(year)} active={selectedYear === String(year)} onClick={() => onYearChange(String(year))} />
          ))}
        </FilterRow>
      )}

      {/* Genres */}
      {genres.length > 0 && (
        <FilterRow>
          <TagPill label="全部" active={selectedGenreId === ""} onClick={() => onGenreChange("")} />
          {genres.map((genre) => (
            <TagPill key={genre.id} label={genre.name} active={selectedGenreId === genre.id} onClick={() => onGenreChange(genre.id)} />
          ))}
        </FilterRow>
      )}

      {/* Sort */}
      <FilterRow>
        {sortOptions.map((opt) => (
          <TagPill key={opt.value} label={opt.label} active={selectedSort === opt.value} onClick={() => onSortChange(opt.value)} />
        ))}
      </FilterRow>
    </div>
  );
}

function FilterRow({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="scrollbar-none flex overflow-x-auto"
      style={{ height: 32, paddingLeft: 12, paddingRight: 12 }}
    >
      {children}
    </div>
  );
}
