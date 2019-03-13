import * as React from "react";
import { observer } from "mobx-react";
import { volStore } from "../../store";
import { Icon, IconTypes } from "../../components/icon";
import { TrackItem } from "../../components/track-item";
import { ViewTypes, VolInfo } from "../../types";
import { Loading } from "../../components/loading";
import "./index.scss";

function renderTracks(vol: VolInfo) {
  const { tracks } = vol;
  if (!tracks) {
    return <Loading />;
  }
  return tracks.map(track => {
    return (
      <TrackItem
        key={track.id}
        name={track.name}
        artist={track.artist}
        album={track.album}
        cover={track.cover}
        isPlaying={false}
        isLiked={false}
        onToggle={() => {}}
        onClick={() => {}}
      />
    );
  });
}

function IVol() {
  const { displayedItem: vol } = volStore;

  if (!vol) {
    return (
      <div id="vol" className={`page view-${ViewTypes.VOL_INFO}`}>
        <Loading />
      </div>
    );
  }

  return (
    <div id="vol" className={`page view-${ViewTypes.VOL_INFO}`}>
      <div
        id="vol-bg"
        style={{
          backgroundImage: `url(${vol.cover})`
        }}
      />

      <div id="vol-bg-mask" />

      <div id="vol-info">
        <div id="vol-info-tags">
          {vol.tags.map(t => (
            <span key={t}>#{t}</span>
          ))}
        </div>
        <p id="vol-info-index">
          vol.
          {vol.vol}
          <Icon type={IconTypes.LIKE} />
          <Icon type={IconTypes.PLAY} />
          {/*{playerStore.isVolPlaying(vol.id) ? (*/}
          {/*<Icon type={IconTypes.PAUSE} />*/}
          {/*) : (*/}
          {/*<Icon*/}
          {/*type={IconTypes.PLAY}*/}
          {/*/>*/}
          {/*)}*/}
        </p>
        <p id="vol-info-title">{vol.title}</p>
        <div
          id="vol-info-desc"
          dangerouslySetInnerHTML={{
            __html: vol.desc
          }}
        />
        <div id="vol-info-date">
          <Icon type={IconTypes.LOGO} />
          <span id="vol-info-author">{vol.author} · </span>
          <span id="vol-info-date">{vol.date}</span>
        </div>
      </div>

      <div id="vol-tracks">{renderTracks(vol)}</div>
    </div>
  );
}

const Vol = observer(IVol);

export { Vol };
